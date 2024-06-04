import { formatDate } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeDetailsService } from 'src/app/feature/Services/employee-details.service';


@Component({
  selector: 'employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})


export class EmployeeDetailsComponent implements OnInit{

  empData:any; //***deaclaring property for storing emp/candi data from local storage***
  
  data:any;
  empDataDetails:any;

  submitted:any=false; //*** deaclaring property for validating the properties ***
  
  candOrempFormUpdate:FormGroup; //***Candidate/Emloyee form***

  employementForm:FormGroup; //*** Employement form***
  

  isEditable1: boolean = false; //*** emp/candiate edit/readonly toggle***
  isEditable2:boolean = false; //***Employement details edit/readonly toggle ***

  today: string; //*** DOB validation ***
  maxDate: string; //*** DOB validation ***
  minDate: string; //*** DOB validation ***

  updateSuccessMsg:boolean=false; //*** for emp/candi updation succes msg ***

  updateFailMsg:boolean=false; //*** for emp/candi updation fail msg ***

  msg:any=''; //for storing msg value from the backend


  constructor(private service:EmployeeDetailsService,private formbulider:FormBuilder){
   
    this.empData = JSON.parse(localStorage.getItem('empData')); // ***coping Local Storage data to this property***
    // console.log('empData',this.empData);
  }

  ngOnInit(){
    this.form1();

    this.today = this.getTodayDate(); //*** DOB validation ***
    this.maxDate = this.getMaxDate(); //*** DOB validation ***
    this.minDate = this.getMinDate(); //*** DOB validation ***

    this.form2();

    if(this.candOrempFormUpdate.get('workerType').value === 'Candidate'){
      this.employementForm.patchValue({ personType:'Candidate'});
    }
    else this.employementForm.patchValue({ personType: 'Employee'})

  }


// ***Candidate/Employee details***

  // *** Form for showing info of Candi/Emp data ***

  form1(){ 
            // console.log("editemp",this.empData);
    // console.log(this.empData.Employee_First_Name);
    // console.log('Worker type:',this.empData.WORKER_TYPE);


    this.candOrempFormUpdate=this.formbulider.group({

      startDate:[formatDate(this.empData.EFFECTIVE_START_DATE, 'yyyy-MM-dd','en'),Validators.required],
      endDate:[formatDate(this.empData.EFFECTIVE_END_DATE,'yyyy-MM-dd','en'),Validators.required],
      workerType:[this.empData.WORKER_TYPE,Validators.required],
      employeeNumber:[this.empData.Employee_Number,Validators.required],
      email:[this.empData.Email,Validators.required],
      firstName:[this.empData.Employee_First_Name,Validators.required],
      middleName:[this.empData.Middle_Name],
      lastName:[this.empData.Last_Name,Validators.required],
      dateOfBirth:[formatDate(this.empData.DATE_OF_BIRTH,'yyyy-MM-dd','en'),[Validators.required,this.dateOfBirthValidator.bind(this)]],
      phoneNumber:[this.empData.MOBILE_NO,Validators.required],
      location:[this.empData.JOB_LOCATION,Validators.required]

    });

      this.candOrempFormUpdate.disable();
  }


//*** DOB validation ***

  getTodayDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

//*** DOB validation ***

  getMaxDate(): string {
    const today = new Date();
    const year = today.getFullYear() - 18;
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

//*** DOB validation ***

  getMinDate(): string {
    const today = new Date();
    const year = today.getFullYear() - 67;
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

//*** DOB validation ***

  dateOfBirthValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (!control.value) {
      return null; 
    }
    const dob = new Date(control.value);
    const today = new Date();
    const minAge = 18;
    const maxAge = 67;
    const minDate = new Date(today.getFullYear() - maxAge, today.getMonth(), today.getDate());
    const maxDate = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());

    if (dob < minDate || dob > maxDate) {
      return { invalidDateOfBirth: true };
    }
    return null;
  }

  
  //***toggle function for candi/emp form editing***

  toggleEdit1(): void {
    this.isEditable1 = !this.isEditable1;
    if (this.isEditable1) {
      this.candOrempFormUpdate.enable();
    } else {
      this.candOrempFormUpdate.disable();
    }
  }

  //***emp/candi data updating function***

  update(){

    this.submitted=true;

    const EMPLOYEENUMBER = this.candOrempFormUpdate.get('employeeNumber');
    console.log("name" ,EMPLOYEENUMBER.value);
    const ID = EMPLOYEENUMBER.value;
    const EMPID=this.empData.Employee_id;
    console.log("EmpID",EMPID);
   
    const empdata ={

      Effective_Start_Date:this.candOrempFormUpdate.value['startDate'],
      Effective_End_Date:this.candOrempFormUpdate.value['endDate'],
      Worker_Type:this.candOrempFormUpdate.value['workerType'],
      Employee_Number:this.candOrempFormUpdate.value['employeeNumber'],
      Email_Id:this.candOrempFormUpdate.value['email'],
      First_Name:this.candOrempFormUpdate.value['firstName'],
      Middle_Name:this.candOrempFormUpdate.value['middleName'],
      Last_Name:this.candOrempFormUpdate.value['lastName'],
      Date_Of_Birth:this.candOrempFormUpdate.value['dateOfBirth'],
      Mobile_No:this.candOrempFormUpdate.value['phoneNumber'],
      Job_Location:this.candOrempFormUpdate.value['location']

   }

   console.log("updatedData:",empdata);

// ***Service for updating emp/candi data

    this.service.updateEmp(empdata,EMPID).subscribe((res:any)=>{
      // console.log(res);
      if (res && res.message) {
        // alert(res.message);
        this.msg = res.message;
        this.updateSuccessMsg = true;
      }
      setTimeout(() =>{
        this.updateSuccessMsg = false;
        this.candOrempFormUpdate.disable();
        this.isEditable1 = !this.isEditable1;
      },2500);
    },
    error=>{
      // console.log(error);
      if (error.error && error.error.error) {
          // console.log(error);
      // alert("update failure");
      // alert(error.error.error); 
        this.updateFailMsg = true;
      this.msg = error.error.error;
      }
      setTimeout(() =>{
        this.updateFailMsg = false;
      },3000);
    });
  }


// Employement Details

  form2(){

    this.employementForm=this.formbulider.group({
      effectiveStartDate:['',Validators.required],
      effectiveEndDate:['4712-12-31'],
      personType:['',Validators.required],
      status:['',Validators.required],
      organizationName:['',Validators.required],
      department:['',Validators.required],
      designation:['',Validators.required],
      confirmationDate:['',],
      dateOfJoining:['',Validators.required],
      currentAnnualSalary:['',Validators.required],
      currentCompanyExp:['',Validators.required],
      previousAnnualSalary:['',Validators.required],
      previousExp:['',Validators.required],
      totalExp:['',Validators.required],
      probationPeriod:['',Validators.required],
      noticePeriod:['',Validators.required]

    });

    this.employementForm.disable();
  }

    //***toggle function for employement details form editing***

    toggleEdit2(): void {
      this.isEditable2 = !this.isEditable2;
      if (this.isEditable2) {
        this.employementForm.enable();
      } else {
        this.employementForm.disable();
      }
    }
  

  
  employementData(){
    console.log(this.employementForm.value);

    const data = {
      Effective_Start_Date:this.employementForm.value['effectiveStartDate'],
      Effective_End_Date:this.employementForm.value['effectiveEndDate'],
      Person_Type:this.employementForm.value['personType'],
      Status:this.employementForm.value['status'],
      Organization_Name:this.employementForm.value['organizationName'],
      Department:this.employementForm.value['department'],
      Designation:this.employementForm.value['designation'],
      Confirmation_Date:this.employementForm.value['confirmationDate'],
      Date_Of_Joining:this.employementForm.value['dateOfJoining'],
      Ctc:this.employementForm.value['currentAnnualSalary'],
      Current_Company_Experience:this.employementForm.value['currentCompanyExp'],
      Post_Annual_Salary:this.employementForm.value['previousAnnualSalary'],
      Previous_Experience:this.employementForm.value['previousExp'],
      Total_Experience:this.employementForm.value['totalExp'],
      Probation_Period:this.employementForm.value['probationPeriod'],
      Notice_Period:this.employementForm.value['noticePeriod']
    }

    console.log("data",data);

    this.service.empData(this.empData.Employee_id,data).subscribe((res:any)=>{

      console.log(res);
      
      if (res && res.message) {
        alert(res.message);
      }
    },
    error=>{
      console.log(error);
      if (error.error && error.error.message){
        alert(error.error.message)
      }
      else {
        console.log(error);
        alert("An error occurred: " + error.statusText);
      } 
    });
  }

  editemp(){
    
    this.service.getEmpData(this.empData.Employee_id).subscribe((res)=>{

      console.log("employement Details",res);
      console.log(this.empData.Employee_id);
      this.empDataDetails=res['data'];

      this.employementForm=this.formbulider.group({

        EffectiveStartDate:[formatDate(this.empDataDetails.EFFECTIVE_START_DATE, 'yyyy-MM-dd','en'),Validators.required],
        effectiveEndDate:['4712-12-31'],
        personType:[this.empDataDetails.PERSON_TYPE,Validators.required],
        status:[this.empDataDetails.STATUS,Validators.required],
        organizationName:[this.empDataDetails.ORGANIZATION_NAME,Validators.required],
        Department:[this.empDataDetails.DEPARTMENT,Validators.required],
        designation:[this.empDataDetails.DESIGNATION,Validators.required],
        confirmationDate:[formatDate(this.empDataDetails.CONFIRMATION_DATE,'yyyy-MM-dd','en'),Validators.required],
        DateOfJoining:[formatDate(this.empDataDetails.DATE_OF_JOINING, 'yyyy-MM-dd','en'),Validators.required],
        CTC:[this.empDataDetails.CTC,Validators.required],
        currentCompanyExp:[this.empDataDetails.CURRENT_COMPANY_EXPERIENCE,Validators.required],
        postAnnualSalary:[this.empDataDetails.POST_ANNUAL_SALARY,Validators.required],
        previousExp:[this.empDataDetails.PREVIOUS_EXPERIENCE,Validators.required],
        totalExp:[this.empDataDetails.TOTAL_EXPERIENCE,Validators.required],
        probationPeriod:[this.empDataDetails.PROBATION_PERIOD,Validators.required],
        noticePeriod:[this.empDataDetails.NOTICE_PERIOD,Validators.required]

      })
    });
  }
  
}
