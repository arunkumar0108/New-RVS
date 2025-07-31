import { Component } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent {
  technologies = ['JavaScript', 'TypeScript', 'Angular', 'React', 'Node.js', 'Python', 'Java', 'C#', 'Django', 'SQL'];
  services = [
    { title: 'Software Development', description: 'Bespoke custom applications built using modern technologies.' },
    { title: 'System Integration', description: 'Connecting systems for seamless data flow and automation.' },
    { title: 'Consulting & Support', description: 'Technology guidance, architecture reviews and ongoing support.' },
  ];
  trainings = [
    { title: 'Corporate Workshops', outcome: 'Hands-on sessions to upskill your team on latest tech.' },
    { title: 'Certification Training', outcome: 'Preparation for industry certifications like AWS, Microsoft, Scrum.' },
    { title: 'Live Project Mentoring', outcome: 'Work on real projects under expert guidance.' },
  ];
  contact() {
    // navigate to contact or open modal
  }
}
