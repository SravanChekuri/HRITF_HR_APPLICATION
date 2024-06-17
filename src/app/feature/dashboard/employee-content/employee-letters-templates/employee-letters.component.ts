import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LettersService } from 'src/app/feature/Services/letters.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'employee-letters-templates',
  templateUrl: './employee-letters-templates.component.html',
  styleUrls: ['./employee-letters-templates.component.css']
})
export class EmployeeLettersTemplatesComponent implements OnInit{

  rtfTemplate:any[]=[];

  file:any;

  letterData:any;

  letterType:any;

  letterId:any;

  templateName:any;

  employeeNumber:any;

  CTC:any;

  GenrateLetter:FormGroup;
   
  fileUrl: SafeUrl | null = null;

  lettersData:any=[
    {name:'HRITF Offer Letter Template',id:10001},
    {name:'HRITF Confirmation Letter Template',id:10002},
    {name:'HRITF Appointment Letter Template',id:10003},
    {name:'HRITF Revision Letter Template',id:10004},
    {name:'HRITF Experince Letter Template',id:10005},
    {name:'HRITF Termination Letter Template',id:1006},
  ];

  errorMsg:any='';

  constructor(private service:LettersService,private sanitizer: DomSanitizer,private formbulider:FormBuilder, private router:Router) { }

  
  ngOnInit() {
    this.genarate()
    this.getTemplates();  
  }
  
  genarate(){
    this.GenrateLetter=this.formbulider.group({
      letterType:['',Validators.required],
    });
  }

  genarateletter(){
    // console.log("letterdata",this.GenrateLetter.value);
  }

  onLetterTypeChange(event:any){
    this.letterType=event.target.value
    // console.log(this.letterType);
    this.lettersData.forEach(element => {
       if(element.name === this.letterType){
        this.letterId = element.id
       }
    });
  }


  onFileChange(event:any){
    const fileInput = event.target;
    // console.log('fileInput',fileInput);
     this.file = fileInput.files[0]; // Get the first selected file
    // console.log(this.file);
    const errorElement = document.getElementById('fileError');

    if (errorElement) {
      errorElement.textContent='';
        errorElement.style.display = 'none';
    }

    if (this.file) {
        const fileExtension = this.file.name.split('.').pop();
        const maxSize = 5 * 1024 * 1024;
        if (fileExtension && fileExtension.toLowerCase() !== 'rtf') {
            if (errorElement) {
                errorElement.style.display = 'inline';
                errorElement.textContent='Please select an .rtf file.'
            }
            return;
        } 

        if (this.file.size > maxSize) {
          if (errorElement) {
              errorElement.textContent = `The file size exceeds the maximum limit of 5 MB.`;
              errorElement.style.display = 'inline';
          }
          return;
      }
    }

}

  
  uploadFile(){
    // console.log(this.file);
    
    let formData=new FormData();
    formData.append("TEMPLATE",this.file);
    formData.append("letterType",this.letterType)
    formData.append("letterId",this.letterId)
  
    this.service.loadTemplate(formData).subscribe(res=>{
      // alert("Success")
      // console.log("File is uploaded",res);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Template Imported Successfully",
        showConfirmButton: false,
        timer: 1500
      });
      this.getTemplates();
    },
    (error)=>{
      // console.log(error);
      if(error.error && error.error.error){
        this.errorMsg = error.error.error;
      }
      if(error.error && error.error.message){
        this.errorMsg = error.error.message;
      }
      else{
        this.errorMsg = error.error.statusText;
      }
      Swal.fire({
        position:'top',
        icon: "error",
        title: "Oops...",
        text: `${this.errorMsg}`,
        showConfirmButton: true,
        width:400,
      });      
    });
  }


  
  displayPdf(letterId: string) {
    this.service.displayPdf(letterId);
    // console.log("letterId",this.letterId);
    
  }

  getTemplates(): void {
    this.service.getTemplates()
      .subscribe(
        (res) => {
          // console.log(res); 
          this.rtfTemplate = res.data;
        },
        (error) => {
          // console.log(error); 
        }
      );
  }


}
