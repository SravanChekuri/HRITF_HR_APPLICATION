
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
    { name: 'Confirmation Letter', id: 10001 },
    { name: 'Offer Letter', id: 10002 },
    { name: 'Appointment Letter', id: 10003 },
  ];

  constructor(private formbuilder: FormBuilder,private service:LettersService) {}

  ngOnInit() {
    this.form();
  }

  form() {
    this.genarateLetterForm = this.formbuilder.group({
      letterTypeName: ['', Validators.required],
      letterIdNumber: ['', Validators.required], // You can initialize with an empty value for now
      employeeNumber: ['', Validators.required],
      // ctc: ['', Validators.required],
    });
  }

  onLetterTypeChange(event: any) {
    this.letterType = event.target.value;
    console.log(this.letterType);
    this.lettersData.forEach((element) => {
      if (element.name === this.letterType) {
        this.letterId = element.id;
        // After setting letterId, update the value of letterIdNumber in the form
        this.genarateLetterForm.patchValue({
          letterIdNumber: this.letterId,
        });
      }
    });
    
  }

  Genarate() {
    console.log('generate letter fields', this.genarateLetterForm.value);
    const genarateData={
      letterType:this.genarateLetterForm.value['letterTypeName'],
      letterId:this.genarateLetterForm.value['letterIdNumber'],
      Employee_Number:this.genarateLetterForm.value['employeeNumber'],
      // CTC:this.genarateLetterForm.value['ctc']

    }


    console.log("genarateData",genarateData);

    this.service.genarateTemplate(genarateData).subscribe((res)=>{
      console.log(res);
      alert("success");
      
    },error=>{
      console.log('error',error);
      
      alert("fail");
    })
    
  }

  view() {
    const genarateData={
      // letterType:this.genarateLetterForm.value['letterTypeName'],
      letterId:this.genarateLetterForm.value['letterIdNumber'],
      Employee_Number:this.genarateLetterForm.value['employeeNumber'],
      // CTC:this.genarateLetterForm.value['ctc']

    }
    console.log(genarateData.letterId,genarateData.Employee_Number);

     this.service.letterData(genarateData.letterId,genarateData.Employee_Number).subscribe((res)=>{
      console.log(res);
      const fileURL = URL.createObjectURL(res);
      window.open(fileURL, '_blank');

      
     },error=>{
      console.log(error);
      
     }
    )
    
    
}
}

