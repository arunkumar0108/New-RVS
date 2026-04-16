using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using New_Crud.DbContxt;
using New_Crud.Models;


namespace New_Crud.Controllers 
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeController : ControllerBase
    {
        private readonly EmployeeDbContext _employee;
        private readonly ILogger<EmployeeController> _logger;
        public EmployeeController(EmployeeDbContext employee, ILogger<EmployeeController> logger)
        {
            _employee = employee;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            _logger.LogInformation("GetAll Employees API called");

            try
            {
                var employees = await _employee.RVSWorkers.ToListAsync();

                if (employees == null || employees.Count == 0)
                {
                    _logger.LogWarning("No employees found in database");
                    return NotFound("No employees found");
                }

                _logger.LogInformation("Fetched {Count} employees successfully", employees.Count);

                return Ok(employees);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while fetching employees");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost]
        public async Task<ActionResult<Employee>> AddEmployee([FromBody] Employee employee)
        {
            _logger.LogInformation("AddEmployee API called");

            if (employee == null)
            {
                _logger.LogWarning("AddEmployee failed: Employee object is null");
                return BadRequest("Employee data is required.");
            }

            _logger.LogInformation("Incoming Employee Data: {@employee}", employee);

            // Check if EmployeeId already exists
            var exists = await _employee.RVSWorkers
                .AnyAsync(e => e.EmployeeId == employee.EmployeeId);

            if (exists)
            {
                _logger.LogWarning("AddEmployee failed: EmployeeId {EmployeeId} already exists", employee.EmployeeId);
                return BadRequest("An Employee with that EmployeeId already exists.");
            }

            try
            {
                _employee.RVSWorkers.Add(employee);
                await _employee.SaveChangesAsync();

                _logger.LogInformation("Employee created successfully with Id {Id}", employee.Id);

                return CreatedAtRoute("GetEmployee", new { id = employee.Id }, employee);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while adding employee with EmployeeId {EmployeeId}", employee.EmployeeId);
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPut("{id:int}")]
        public IActionResult Update(int id, [FromBody]Employee employee)
        {
            var excist = _employee.RVSWorkers.FirstOrDefault(e => e.Id == id);

            if (excist == null)
            {
                return NotFound();
            }
            excist.EmployeeId = employee.EmployeeId;
            excist.Name = employee.Name;
            excist.Salary = employee.Salary;
            excist.Designation = employee.Designation;
            excist.Experience = employee.Experience;
            
            _employee.SaveChanges();
            return Ok(excist);
        }

        //[HttpGet("employees/{name:alpha}")]
        //public IActionResult GetByName(string name)
        //{
        //    var emp = _employee.RVSWorkers.FirstOrDefault(e => e.Name == name);
        //    return emp == null ? NotFound() : Ok(emp);
        //}

        //[HttpGet("employees/{id:int}/{status?}")]
        //public IActionResult GetEmployee(int id, string? status)
        //{
        //    var emp = _employee.RVSWorkers.FirstOrDefault(e => e.Id == id);

        //    if (emp == null)
        //        return NotFound();

        //    if (status != null && emp.Status != status)
        //        return NotFound();

        //    return Ok(emp);
        //}

        [HttpGet("{id:int}", Name = "GetEmployee")]
        public IActionResult GetById(int id)
        {
            var emp = _employee.RVSWorkers.FirstOrDefault(e => e.Id == id);
            if (emp == null)
            {
                return NotFound();
            }
            //return CreatedAtRoute("GetEmployee", new { id = emp.Id }, emp);
            return Ok(emp);
        }

        [HttpDelete("{id}")]        
        public IActionResult DeleteEmployee(int id)
        {
            var employee = _employee.RVSWorkers.Find(id);
            if (employee == null)
            {
                return NotFound();
            }

            _employee.RVSWorkers.Remove(employee);
            _employee.SaveChanges();

            return NoContent();
        }
    }
}
