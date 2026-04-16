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
        private readonly  EmployeeDbContext _employee;
        public EmployeeController(EmployeeDbContext employee)
        {
            _employee = employee;
        }

        //[Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _employee.RVSWorkers.ToListAsync());
        }

        //[HttpGet("{id}")]
        //public async Task<IActionResult> GetById(int id)
        //{
        //    var emp = await _employee.RVSWorkers.FindAsync(id);
        //    return emp == null ? NotFound() : Ok(emp);
        //}

        [HttpPost]
        public async Task<ActionResult<Employee>> AddEmployee([FromBody] Employee employee)
        {
            if (employee == null)
                return BadRequest("Employee data is required.");

            // 1. Check if EmployeeId already exists in the database
            var exists = await _employee.RVSWorkers
                .AnyAsync(e => e.EmployeeId == employee.EmployeeId);

            if (exists)
            {
                return BadRequest("An Employee with that EmployeeId already exists.");
            }

            // 2. Add the new employee
            _employee.RVSWorkers.Add(employee);
            await _employee.SaveChangesAsync();

            //return CreatedAtRoute("GetEmployee", new { id = employee.Id }, employee);
            return Ok(employee);
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
