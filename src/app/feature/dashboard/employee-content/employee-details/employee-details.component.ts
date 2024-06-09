import { formatDate } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeAddService } from 'src/app/feature/Services/employee-add.service';
import { EmployeeDetailsService } from 'src/app/feature/Services/employee-details.service';


@Component({
  selector: 'employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})


export class EmployeeDetailsComponent implements OnInit{

  empData:any; //***deaclaring property for storing emp/candi data from local storage***
  
  submitted:any=false; //*** deaclaring property for validating the properties ***
  
  candOrempFormUpdate:FormGroup; //***Candidate/Emloyee form***

  employementForm:FormGroup; //*** Employement form***
  
  PresentAddressForm:FormGroup;
  PermanentAddressForm:FormGroup;

  isEditable1: boolean = false; //*** emp/candiate edit/readonly toggle***
  isEditable2:boolean = false; //***Employement details edit/readonly toggle ***
  isEditable3:boolean = false; //***Employement Address edit/readonly toggle ***

  today: string; //*** DOB validation ***
  maxDate: string; //*** DOB validation ***
  minDate: string; //*** DOB validation ***

  updateSuccessMsg:boolean=false; //*** for emp/candi updation succes msg ***

  updateFailMsg:boolean=false; //*** for emp/candi updation fail msg ***

  msg:any=''; //for storing msg value from the backend

  empRecord:any;  //*** for updating emp/candi records ***
  startDate:any;  // *** start date for emp/candi form ***
  endDate:any = '4712-12-31'; // *** end date for emp/candi form ***

  // empDataDetails:any; // ***deaclaring property for storing employement data ***
  filteredEmpData:any;
  employementStartDate:any;
  empEndDate:any = '4712-12-31';

  empmentDetails:any;

  empsd:any;
  employeement:any;

  empHomeAddress:any;
  empWorkAddress:any;

  addressEsd:any;
  addressEnd:any;
  // addressType:any;


  constructor(private service:EmployeeDetailsService,public empAddService:EmployeeAddService,private formbulider:FormBuilder){
   
    this.empData = JSON.parse(localStorage.getItem('empData')); // ***coping Local Storage data to this property***
    console.log('empData from constr:',this.empData);
    this.empmentDetails=JSON.parse(localStorage.getItem('employementData'));
      console.log("employement Data from constr:",this.empmentDetails);
    this.empsd = localStorage.getItem('effectiveStartDate');
    this.employeement = localStorage.getItem('effectiveStartDate');
    this.empHomeAddress=JSON.parse(localStorage.getItem('empHomeAddress'));
    console.log("empHomeAddress from constr:", this.empHomeAddress);
    this.empWorkAddress=JSON.parse(localStorage.getItem('EmpworkAddress'));
    console.log("empWorkAddress from constr:",this.empWorkAddress);

  }

  ngOnInit():void {

    console.log("emp Id from onInit: ",this.empData.Employee_id);

    this.form1();
    this.form2();
    this.form3();

    this.today = this.getTodayDate(); //*** DOB validation ***
    this.maxDate = this.getMaxDate(); //*** DOB validation ***
    this.minDate = this.getMinDate(); //*** DOB validation ***

    // console.log("empmentDetails", this.empmentDetails.ORGANIZATION_NAME);

    console.log("empmentDetails from onInit:", this.empmentDetails.ORGANIZATION_NAME);

    if(this.empmentDetails){
            this.editemp();    
    }

    if(this.empHomeAddress){
            // this.editAddress()
    }

    if (this.empWorkAddress){
            // this.workAddress()
    }


    //***setting default values to respective worker type ***

    if(this.candOrempFormUpdate.get('workerType').value === 'Candidate'){
      this.employementForm.patchValue({ personType:'Candidate'});
    }
    else this.employementForm.patchValue({ personType: 'Employee'});

  }


// ***************************************** Candidate/Employee details **********************************************************************************

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

      console.log("emp data from Frontend:",this.candOrempFormUpdate.value);
      
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
      this.form1();
    }
  }
  

  //***emp/candi data updating function***

  update(){

    this.submitted=true;

    const EMPLOYEENUMBER = this.candOrempFormUpdate.get('employeeNumber');
    console.log("emp number from update method:" ,EMPLOYEENUMBER.value);
    const ID = EMPLOYEENUMBER.value;
    const EMPID=this.empData.Employee_id;
    console.log("EmpID from update method:",EMPID);
   
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

   console.log("Emp Data to backend:",empdata);

// ***Service for updating emp/candi data

    this.service.updateEmp(empdata,EMPID).subscribe((res:any)=>{

      this.getempDetails(this.candOrempFormUpdate.value['startDate'],this.candOrempFormUpdate.value['employeeNumber'])

      console.log("updateEmp Service res:",res);

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


  getempDetails(ESD,EMPNO){

    this.empAddService.sendDateOrEmpnumber(EMPNO,ESD,undefined).subscribe((res)=>{

      console.log('ESD from getempDetails method:',ESD);
      console.log("res from getempDetails method:",res['EMPLOYEE_DETAILS']);

      this.empData=res['EMPLOYEE_DETAILS'];
      localStorage.setItem('empData',JSON.stringify(this.empData) );

      console.log("employeeData from getempDetails method:",this.empData);

      this.empmentDetails=res['Employement_Details'];
      this.empHomeAddress=res['Home_Address_Details'];
      this.empWorkAddress=res['Work_Address_Details'];

      console.log("employeementData from getempDetails method:",this.empmentDetails);

      if(this.empmentDetails){ this.editemp()}

      if (this.empHomeAddress){ }
  
      if (this.empWorkAddress){ }
      
     },error=>{
       console.log("error from getempDetails method:",error);
     });
  
  }


//*** Emp/candidate search by ESD and EED***

  onStartDateChange(event:any){
    console.log("start date change from emp/candi:",event.target.value);
        this.startDate = event.target.value;
        console.log("Emp/Candi Start Date:",this.startDate);
  }

//*** Emp/candidate search by ESD and EED***

  onEndDateChange(event:any){
    console.log("end date:",event.target.value);
        this.endDate = event.target.value;
        console.log("Emp/Candi End Date",this.endDate); 
  }

//*** method for updating emp/candidate data */

  submitData(){

    console.log("emp start date change:",this.startDate);
    console.log("emp end date change:",this.endDate);
    
        this.service.sendDate(this.startDate,this.empData.Employee_id,this.endDate).subscribe((res)=>{
            console.log("res from submitData",res);
          this.empRecord = res['data'];
            console.log("submitData, empRecord.first name:",this.empRecord.Employee_First_Name);
            
          this.candOrempFormUpdate = this.formbulider.group({
            startDate:[formatDate(this.empRecord.EFFECTIVE_START_DATE, 'yyyy-MM-dd','en'),Validators.required],
            endDate:[formatDate(this.empRecord.EFFECTIVE_END_DATE,'yyyy-MM-dd','en'),Validators.required],
            workerType:[this.empRecord.WORKER_TYPE,Validators.required],
            employeeNumber:[this.empRecord.Employee_Number,Validators.required],
            email:[this.empRecord.Email,Validators.required],
            firstName:[this.empRecord.Employee_First_Name,Validators.required],
            middleName:[this.empRecord.Middle_Name],
            lastName:[this.empRecord.Last_Name,Validators.required],
            dateOfBirth:[formatDate(this.empRecord.DATE_OF_BIRTH,'yyyy-MM-dd','en'),Validators.required],
            phoneNumber:[this.empRecord.MOBILE_NO,Validators.required],
            location:[this.empRecord.JOB_LOCATION,Validators.required]
          });
          console.log("emp data from submitData method:",this.candOrempFormUpdate);
        },
          error=>{
            // console.log(error);
            if(error.error && error.error.message){
              this.updateFailMsg = true;
              this.msg = error.error.message;
            };
            setTimeout(() =>{
              this.updateFailMsg = false;
            },3000);      
          });
  }



// ******************************************* Employement Details ***********************************************************************************

  form2(){

    this.employementForm=this.formbulider.group({
      effectiveStartDate:['',Validators.required],
      effectiveEndDate:['4712-12-31'],
      personType:['',Validators.required],
      employeeId:[this.empData.Employee_id],
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
    console.log("employement data from frontend:",this.employementForm.value);
    
  }

    //***toggle function for employement details form editing***

  toggleEdit2(): void {
    this.isEditable2 = !this.isEditable2;
      if (this.isEditable2) {
        this.employementForm.enable();
      } else {
        this.employementForm.disable();
        this.form2();
        this.editemp();
        const workerTypeControl = this.candOrempFormUpdate.get('workerType');
        const personTypeControl = this.employementForm.get('personType');
        if (workerTypeControl && personTypeControl) {
          personTypeControl.setValue(workerTypeControl.value);
        }   
    }
  }
  

  employementData(){

    console.log("data from employement Data method:",this.employementForm.value);

    const data = {
      Effective_Start_Date:this.employementForm.value['effectiveStartDate'],
      Effective_End_Date:this.employementForm.value['effectiveEndDate'],
      Person_Type:this.employementForm.value['personType'],
      Employee_Id:this.employementForm.value['employeeId'],
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

    console.log("employement data to backend",data);

    this.service.empData(this.empData.Employee_id,data).subscribe((res:any)=>{

      console.log("res from employement Data method:",res);
      
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


  onEmpStartDateChange(event:any){
    console.log("Employement Start Date:",event.target.value);
      this.employementStartDate = event.target.value;
    console.log("Employement Start date:",this.employementStartDate);  
  }


  onEmpEndDateChange(event:any){
    console.log("Employement End Date:",event.target.value);
      this.empEndDate = event.target.value;
    console.log("Employement end date:",this.empEndDate);
  }
  
  submitEmployementData(){
    console.log("Employement start date:",this.employementStartDate);
    
    console.log("Employement end date:",this.empEndDate);

    this.service.empSendDate(this.employementStartDate,this.empData.Employee_id,this.empEndDate).subscribe((res)=>{
      console.log("res from submitEmployementData method:",res);
        this.filteredEmpData = res['data'];
        
      this.employementForm = this.formbulider.group({
        effectiveStartDate:[formatDate(this.filteredEmpData.EFFECTIVE_START_DATE, 'yyyy-MM-dd','en'),Validators.required],
        effectiveEndDate:[formatDate(this.filteredEmpData.EFFECTIVE_END_DATE, 'yyyy-MM-dd','en'),Validators.required],
        personType:[this.filteredEmpData.PERSON_TYPE,Validators.required],
        employeeId:[this.empData.Employee_id],
        status:[this.filteredEmpData.STATUS,Validators.required],
        organizationName:[this.filteredEmpData.ORGANIZATION_NAME,Validators.required],
        department:[this.filteredEmpData.DEPARTMENT,Validators.required],
        designation:[this.filteredEmpData.DESIGNATION,Validators.required],
        confirmationDate:[formatDate(this.filteredEmpData.CONFIRMATION_DATE,'yyyy-MM-dd','en'),Validators.required],
        dateOfJoining:[formatDate(this.filteredEmpData.DATE_OF_JOINING, 'yyyy-MM-dd','en'),Validators.required],
        currentAnnualSalary:[this.filteredEmpData.CTC,Validators.required],
        currentCompanyExp:[this.filteredEmpData.CURRENT_COMPANY_EXPERIENCE,Validators.required],
        previousAnnualSalary:[this.filteredEmpData.POST_ANNUAL_SALARY,Validators.required],
        previousExp:[this.filteredEmpData.PREVIOUS_EXPERIENCE,Validators.required],
        totalExp:[this.filteredEmpData.TOTAL_EXPERIENCE,Validators.required],
        probationPeriod:[this.filteredEmpData.PROBATION_PERIOD,Validators.required],
        noticePeriod:[this.filteredEmpData.NOTICE_PERIOD,Validators.required]
      });

      console.log("employement data***:",this.employementForm.value);
      
    },error =>{
      console.log(error);
      if (error.error && error.error.message){
        console.log(error.error.message);
      }
      else {
        console.log("An error occurred: " + error.statusText);
      }
    });
  }


  editemp(){
    
    console.log("this.empmentDetailsdit",this.empmentDetails);
    console.log("this.empmentDetailsdit",this.empmentDetails.ORGANIZATION_NAME);

    // this.service.getEmpData(this.empData.Employee_id).subscribe((res)=>{

      // console.log("employement Details",res);
      // console.log(this.empData.Employee_id);
      // this.empDataDetails=res['data'];

      this.employementForm=this.formbulider.group({

        effectiveStartDate:[formatDate(this.empmentDetails.EFFECTIVE_START_DATE, 'yyyy-MM-dd','en'),Validators.required],
        effectiveEndDate:[ formatDate(this.empmentDetails.EFFECTIVE_END_DATE, 'yyyy-MM-dd','en'),Validators.required],
        personType:[this.empmentDetails.PERSON_TYPE,Validators.required],
        employeeId:[this.empData.Employee_id],
        status:[this.empmentDetails.STATUS,Validators.required],
        organizationName:[this.empmentDetails.ORGANIZATION_NAME,Validators.required],
        department:[this.empmentDetails.DEPARTMENT,Validators.required],
        designation:[this.empmentDetails.DESIGNATION,Validators.required],
        confirmationDate:[formatDate(this.empmentDetails.CONFIRMATION_DATE,'yyyy-MM-dd','en'),Validators.required],
        dateOfJoining:[formatDate(this.empmentDetails.DATE_OF_JOINING, 'yyyy-MM-dd','en'),Validators.required],
        currentAnnualSalary:[this.empmentDetails.CTC,Validators.required],
        currentCompanyExp:[this.empmentDetails.CURRENT_COMPANY_EXPERIENCE,Validators.required],
        previousAnnualSalary:[this.empmentDetails.POST_ANNUAL_SALARY,Validators.required],
        previousExp:[this.empmentDetails.PREVIOUS_EXPERIENCE,Validators.required],
        totalExp:[this.empmentDetails.TOTAL_EXPERIENCE,Validators.required],
        probationPeriod:[this.empmentDetails.PROBATION_PERIOD,Validators.required],
        noticePeriod:[this.empmentDetails.NOTICE_PERIOD,Validators.required]

      });

      console.log("employement form data from editemp method:",this.employementForm.value);
      
      this.employementForm.disable();
      // });
  }


  // ****************************************** Employee  Address details **********************************************************************************

  
  form3(){

      this.PresentAddressForm = this.formbulider.group({

        employeeId:[this.empData.Employee_id],
        workAddressType:['',Validators.required],
        workAddress:['',Validators.required],
        workState:['',Validators.required],
        workCountry:['',Validators.required],
        workCity:['',Validators.required],
        workPincode:['',Validators.required],
        workEffectiveStartDate:[,Validators.required],
        workEffectiveEndDate:['4712-12-31',Validators.required]  

      });
      this.PermanentAddressForm.disable();
      console.log("Work Address data from frontend:",this.PresentAddressForm.value);
      
  }

  toggleEdit3(): void {
    this.isEditable3 = !this.isEditable3;
    if (this.isEditable3) {
      this.PresentAddressForm.enable();
      this.PermanentAddressForm.enable();
    } else {
      this.PresentAddressForm.disable();
      this.PermanentAddressForm.disable();
      this.form3();
      this.form4();
    }
  }



  addressData(){

    console.log("Home Address data from addressData method:",this.PresentAddressForm.value);

    const addressData = {
      Date_From:this.PresentAddressForm.value['workEffectiveStartDate'],
      Date_To:this.PresentAddressForm.value['workEffectiveEndDate'],
      Address_Type:this.PresentAddressForm.value['workAddressType'],
      Employee_Id:this.PresentAddressForm.value['employeeId'],
      City:this.PresentAddressForm.value['workCity'],
      State:this.PresentAddressForm.value['workState'],
      Country:this.PresentAddressForm.value['workCountry'],
      Pin_Code:this.PresentAddressForm.value['workPincode'],
    }
      console.log("Home Address data to backend:",addressData);

      this.service.address(addressData).subscribe((res:any)=>{

        console.log("res from address api:",res);

        if (res && res.message){
          alert(res.message);
        }

        console.log(" work Address stored Successfully");
   
    },error =>{
        console.log("error from address api:",error);
        if (error.error && error.error.message) {
          alert(error.error.message); 
        }
    });
  }

  editWorkAddress(){

      this.PresentAddressForm = this.formbulider.group({
        effectiveStartDate:[formatDate(this.empWorkAddress.DATE_FROM, 'yyyy-MM-dd','en'),Validators.required],
        effectiveEndDate:[formatDate(this.empWorkAddress.DATE_TO, 'yyyy-MM-dd','en'),Validators.required],
        addressType:[this.empWorkAddress.ADDRESS_TYPE,Validators.required],
        address:[this.empWorkAddress.ADDRESS,Validators.required],
        city:[this.empWorkAddress.CITY,Validators.required],
        state:[this.empWorkAddress.STATE,Validators.required],
        country:[this.empWorkAddress.COUNTRY,Validators.required],
        pincode:[this.empWorkAddress.PIN_CODE,Validators.required]  
      });

      console.log("work Address form editHomeAddress method:",this.PresentAddressForm.value);
      
  }


  form4(){

  }

  
}
