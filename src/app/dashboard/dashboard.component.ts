import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Chart, ChartConfiguration, ChartOptions, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, NgChartsModule, FullCalendarModule],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss' // Changed to scss to match project style
})
export class DashboardComponent {
    // Chart.js Configuration
    public lineChartData: ChartConfiguration<'line'>['data'] = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                data: [65, 59, 80, 81, 56, 55, 40],
                label: 'Appointments',
                fill: true,
                tension: 0.5,
                borderColor: 'black',   
                backgroundColor: 'rgba(0,0,0,0.3)'
            }
        ]
    };
    public lineChartOptions: ChartOptions<'line'> = {
        responsive: true,
        maintainAspectRatio: false
    };
    public lineChartLegend = true;

    // FullCalendar Configuration
    calendarOptions: CalendarOptions = {
        initialView: 'dayGridMonth',
        plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        dateClick: (arg: any) => this.handleDateClick(arg),
        events: [
            { title: 'Doctor Appointment', date: new Date().toISOString().split('T')[0] },
            { title: 'Follow-up', date: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString().split('T')[0] }
        ]
    };

    handleDateClick(arg: any) {
        console.log('Date clicked: ' + arg.dateStr);
    }
}
