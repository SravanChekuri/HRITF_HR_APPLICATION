import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { LettersService } from 'src/app/feature/Services/letters.service';

@Component({
  selector: 'employee-letters-templates',
  templateUrl: './employee-letters-templates.component.html',
  styleUrls: ['./employee-letters-templates.component.css']
})
export class EmployeeLettersTemplatesComponent implements OnInit{
  //fileUrl: string = 'file:///C:/Users/anant/Downloads/sample-1.rtf';
  rtfTemplate:any;
  file:any;
  letterData:any;
  letterType:any;
  letterId:any;
  templateName:any;
   
  fileUrl: SafeUrl | null = null;
  lettersData:any=[
    {name:'Confirmation Letter',id:10001},
    {name:'Offer Letter',id:10002},
    {name:'Appoinment Letter',id:10003},


    
  ]
  constructor(private service:LettersService,private sanitizer: DomSanitizer) { }

  ngOnInit() {
    //this.getLetter()
    
  }

  onLetterTypeChange(event:any){
    this.letterType=event.target.value
    console.log(this.letterType);
    this.lettersData.forEach(element => {
       if(element.name === this.letterType){
        this.letterId = element.id
       }
    });
    
    

  }

  onFileChange(event:any){
    const fileInput = event.target;
    console.log('fileInput',fileInput);
     this.file = fileInput.files[0]; // Get the first selected file
    console.log(this.file);
    const errorElement = document.getElementById('fileError');

    // Reset the file input and error display
    //fileInput.value = '';
    if (errorElement) {
      errorElement.textContent='';
        errorElement.style.display = 'none';
    }

    if (this.file) {
        const fileExtension = this.file.name.split('.').pop();
        const maxSize = 5 * 1024 * 1024;
        if (fileExtension && fileExtension.toLowerCase() !== 'rtf') {
            // File is not an .rtf file
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
      // const blob = new Blob([this.file], { type: 'application/rtf' });
      // this.fileUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
      // console.log("url",this.fileUrl);
      
      
    }
    
    

}

  
  uploadFile(){
    console.log(this.file);
    
    let formData=new FormData();
    formData.append("TEMPLATE",this.file);
    formData.append("letterType",this.letterType)
    formData.append("letterId",this.letterId)

    this.service.loadTemplate(formData).subscribe(res=>{
      alert("Success")
      console.log("File is uploaded",res);
    },
    (error)=>{
      alert("failure")
      alert(error)
    }
  )

  }


  
  displayPdf(letterId: string) {
    this.service.displayPdf(letterId);
    console.log(this.letterId);
    
  }

  // beforeStoringDatabase(): void {
  //   if (this.fileUrl) {
  //     window.open(this.fileUrl.toString(), '_blank'); // Open the Blob URL in a new tab
     
  //   } else {
  //     // this.displayError('No file available to view.');
  //   }
  // }


}
