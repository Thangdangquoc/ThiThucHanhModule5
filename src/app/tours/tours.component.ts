import { Component, OnInit } from '@angular/core';
import {Tour} from "../model/tour";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ToursService} from "../service/tours.service";

@Component({
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.css']
})
export class ToursComponent implements OnInit {
tours: Tour[] = [];
tourForm !: FormGroup;
tourFormUpdate !: FormGroup;
tourFormDetail !: FormGroup;
  idShow!: any;

  constructor(private tourService: ToursService,
              private formGroup: FormBuilder) { }

  ngOnInit(): void {
    this.tourForm = this.formGroup.group({
      id: [""],
      title: [""],
      price: [""],
      description: [""],
    })
    this.tourFormUpdate = this.formGroup.group({
      id: [""],
      title: [""],
      price: [""],
      description: [""],
    })
    this.tourFormDetail = this.formGroup.group({
      id: [""],
      title: [""],
      price: [""],
      description: [""],
    })
    this.displayTour()
  }
  displayTour(){
    this.tourService.findAll().subscribe(data=>{
      this.tours = data
    })
  }
  createTour(){
    let tour ={
      title: this.tourForm.value.title,
      price: this.tourForm.value.price,
      description: this.tourForm.value.description,

    }
    this.tourService.create(tour).subscribe(value => {
      this.ngOnInit()
      alert("Tạo thành công!")
      // swal ( "Succsess" ,  "Something went wrong!" ,  "success" )
      // $('#myModal').modal('hide');

    })
  }


  deleteTour(id?: number) {
    if (confirm("Bạn chắc chắn xóa phần tử này?")){
      this.tourService.deleteTour(id).subscribe(data =>{
        this.ngOnInit()
      })}
  }

  display(id?: number) {
    this.tourService.findBy(id).subscribe(data =>{
      this.idShow = id;
      console.log(id);
      this.tourFormUpdate = new FormGroup({
        title: new FormControl(data.title),
        price: new FormControl(data.price),
        description: new FormControl(data.description),
      });
    })
  }
  display1(id?: number) {
    this.tourService.findBy(id).subscribe(data =>{
      this.idShow = id;
      console.log(id);
      this.tourFormDetail = new FormGroup({
        title: new FormControl(data.title),
        price: new FormControl(data.price),
        description: new FormControl(data.description),
      });
    })
  }

  updateProvince() {
    let tour ={
      id: this.idShow,
      title: this.tourFormUpdate.value.title,
      price: this.tourFormUpdate.value.price,
      description: this.tourFormUpdate.value.description
    }
    console.log(tour)
    this.tourService.update(this.idShow,tour).subscribe(value => {
      this.ngOnInit()
      alert("Sửa thành công!")
      // swal ( "Succsess" ,  "Something went wrong!" ,  "success" )
    })
  }
}
