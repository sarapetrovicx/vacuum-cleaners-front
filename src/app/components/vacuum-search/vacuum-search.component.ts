import { Component, inject } from '@angular/core';

import { VacuumService } from 'src/service/vacuum.service';
import { VacuumCleaner } from 'src/model';
import { NgbCalendar, NgbDate, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-vacuum-search',
  templateUrl: './vacuum-search.component.html',
  styleUrls: ['./vacuum-search.component.css']
})
export class VacuumSearchComponent {

	form: FormGroup;
	selectedValue: string = ''; 
	status: string[] = [];
	startDate: Date = new Date();
	endDate: Date = new Date();
	calendar = inject(NgbCalendar);
	formatter = inject(NgbDateParserFormatter);
	searchResults: VacuumCleaner[] = [];
	hoveredDate: NgbDate | null = null;
	fromDate: NgbDate | null = this.calendar.getToday();
	toDate: NgbDate | null = this.calendar.getNext(this.calendar.getToday(), 'd', 10);
	token: string ='';


	constructor(private fb: FormBuilder, private vacuumService: VacuumService) {
		this.form = this.fb.group({
			email : [''],
		  });
		  this.token = localStorage.getItem("authToken") || "";
	 }


	searchVacuums(): void {
		if (this.fromDate != null && this.toDate != null) {
			const fromDateFormatted: string = `${this.fromDate.year}-${this.pad(this.fromDate.month)}-${this.pad(this.fromDate.day)}`;
			const toDateFormatted: string = `${this.toDate.year}-${this.pad(this.toDate.month)}-${this.pad(this.toDate.day)}`;
			const name: string = this.form.get('email')?.value;
			console.log(fromDateFormatted + " - " + toDateFormatted);
			this.vacuumService.searchVacuums(name, this.selectedValue, fromDateFormatted, toDateFormatted, this.token)
				.subscribe(results => {
					console.log(results);
					this.searchResults = results;
				});
		}
	}

	startVacuum(vacuum: VacuumCleaner): void {
		this.vacuumService.start(vacuum.vacuumId, this.token)
		.subscribe(
			(data) => {
			  console.log(data);
			},
			(error) => {
				console.log(error);
			  	alert(error.error.text);
			}
		  );
	}

	stopVacuum(vacuum: VacuumCleaner): void {
		this.vacuumService.stop(vacuum.vacuumId, this.token)
			.subscribe(
				(data) => {
				console.log(data);
				},
				(error) => {
					alert(error.error.text);
				}
		  );
	}

	dischargeVacuum(vacuum: VacuumCleaner): void {
		this.vacuumService.discharge(vacuum.vacuumId, this.token)
			.subscribe(
				(data) => {
				console.log(data);
				},
				(error) => {
					alert(error.error.text);
				}
		  );
	}

	removeVacuum(vacuum: VacuumCleaner): void {
		this.vacuumService.discharge(vacuum.vacuumId, this.token)
		.subscribe(
			(data) => {
			console.log(data);
			},
			(error) => {
				alert(error.error.text);
			}
	  );
	}
	
	private pad(n: number): string {
		return n < 10 ? '0' + n : '' + n;
	}
	

	onDateSelection(date: NgbDate) {
		if (!this.fromDate && !this.toDate) {
			this.fromDate = date;
		} else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
			this.toDate = date;
		} else {
			this.toDate = null;
			this.fromDate = date;
		}
	}

	isHovered(date: NgbDate) {
		return (
			this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
		);
	}

	isInside(date: NgbDate) {
		return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
	}

	isRange(date: NgbDate) {
		return (
			date.equals(this.fromDate) ||
			(this.toDate && date.equals(this.toDate)) ||
			this.isInside(date) ||
			this.isHovered(date)
		);
	}

	validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
		const parsed = this.formatter.parse(input);
		return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
	}
}

