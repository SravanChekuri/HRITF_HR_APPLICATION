
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LettersService } from 'src/app/feature/Services/letters.service';

@Component({
  selector: 'employee-generate-letters',
  templateUrl: './employee-generate-letters.component.html',
  styleUrls: ['./employee-generate-letters.component.css']
})
export class EmployeeGenerateLettersComponent implements OnInit {

  genarateLetterForm: FormGroup;

  letterType: any;
  
  letterId: any;

  pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";

  lettersData: any = [
    {name:'HRITF Offer Letter ',id:10001},
    {name:'HRITF Confirmation Letter ',id:10002},
    {name:'HRITF Appointment Letter ',id:10003},
    {name:'HRITF Revision Letter ',id:10004},
    {name:'HRITF Experince Letter ',id:10005},
    {name:'HRITF Termination Letter ',id:1006},
  ];

  generatedLetters:any[]=[];

  empNumber:any;

  empletters:any[]=[];

  constructor(private formbuilder: FormBuilder,private service:LettersService) {}

  ngOnInit() {
    this.form();
    
  }

  form() {

    this.genarateLetterForm = this.formbuilder.group({

      letterTypeName: ['', Validators.required],
      letterIdNumber: ['', Validators.required], 
      employeeNumber: ['', Validators.required]

    });
  }


  onLetterTypeChange(event: any) {
    this.letterType = event.target.value;
    // console.log(this.letterType);
    this.lettersData.forEach((element) => {
      if (element.name === this.letterType) {
        this.letterId = element.id;
        this.genarateLetterForm.patchValue({
          letterIdNumber: this.letterId,
        });
      }
    });
    
  }

  Genarate() {
    // console.log('generate letter fields', this.genarateLetterForm.value);

    const genarateData={
      letterType:this.genarateLetterForm.value['letterTypeName'],
      letterId:this.genarateLetterForm.value['letterIdNumber'],
      Employee_Number:this.genarateLetterForm.value['employeeNumber'],

    }

    // console.log("genarateData",genarateData);

    this.service.genarateTemplate(genarateData).subscribe((res)=>{
      // console.log(res);
      // alert("success");
      this.genarateLetterForm.reset();
      
    },error=>{
      // console.log('error',error);
      // alert(error.error.error);
    });
  }



  view(letterId: number, empNumber: string) {

     this.service.letterData(letterId,empNumber).subscribe((res)=>{
      // console.log(res);
      const fileURL = URL.createObjectURL(res);
      window.open(fileURL, '_blank');
     },error=>{
      // console.log(error); 
     });
}



  viewLetters(){
    this.service.getLetters(this.empNumber).subscribe((res)=>{
      // console.log(res);
      this.empletters = res.data;
    },error=>{
      // console.log(error);
      // alert(error.error.error);
    });
}




}

