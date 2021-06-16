import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'app/_shared/services/loader.service';
// import { LoaderService } from '../../services/loader.service';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-my-loader',
  templateUrl: './my-loader.component.html',
  styleUrls: ['./my-loader.component.css']
})
export class MyLoaderComponent implements OnInit {
  constructor(
    private loaderService: LoaderService,
    private spinner: NgxSpinnerService) {
    this.loaderService.isLoading.subscribe((loading) => {
      console.log(loading);
      if (loading == true)
        this.spinner.show();
      else
        this.spinner.hide();
    });
  }
  ngOnInit() {
  }

}