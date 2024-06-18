import { formatDate } from '@angular/common';
import { Component, OnInit, HostListener} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeAddService } from 'src/app/feature/Services/employee-add.service';
import { EmployeeDetailsService } from 'src/app/feature/Services/employee-details.service';
import Swal from 'sweetalert2';


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

  emergencyDetailsForm:FormGroup;

  isEditable1: boolean = false; //*** emp/candiate edit/readonly toggle***

  isEditable2:boolean = false; //***Employement details edit/readonly toggle ***

  isEditable3:boolean = false; //***Employement Address edit/readonly toggle ***

  isEditable4:boolean = false; //***Emergency details edit/readonly toggle ***

  today: string; //*** DOB validation ***

  maxDate: string; //*** DOB validation ***

  minDate: string; //*** DOB validation ***

  // updateSuccessMsg:boolean=false; //*** for emp/candi updation succes msg ***

  updateFailMsg:boolean=false; //*** for emp/candi updation fail msg ***

  msg:any=''; //for storing msg value from the backend

  empRecord:any;  //*** for updating emp/candi records ***

  startDate:any;  // *** start date for emp/candi form ***

  endDate:any = '4712-12-31'; // *** end date for emp/candi form ***

  // empDataDetails:any; // ***deaclaring property for storing employement data **

  filteredEmpData:any;

  employementStartDate:any;

  empEndDate:any = '4712-12-31';

  empmentDetails:any;

  empSD:any;

  employeementSD:any;

  addressSD:any;

  empPresentAddress:any;

  empPermanentAddress:any;

  addressEsd:any;

  addressEnd:any;

  emergSD:any;

  emergMsg:any;

  isCollapsabled:boolean = false;

  isCollapsabled2:boolean = false;

  isCollapsabled3:boolean = false;

  isCollapsabled4:boolean = false;

  isLoading:boolean = false; //loading animation

  presentAddressData:any;

  PeffectiveEndDate:any;

  permanentAddressData:any;

  permanentEsd:any;

  permanentEnd:any;

  presentEnd:any;


  constructor(private service:EmployeeDetailsService,public empAddService:EmployeeAddService,private formbulider:FormBuilder){
   
    this.empData = JSON.parse(localStorage.getItem('empData')); // ***coping Local Storage data to this property***
    // console.log('empData from constr:',this.empData);

    this.empmentDetails=JSON.parse(localStorage.getItem('employementData'));
      // console.log("employement Data from constr:",this.empmentDetails);

    this.empSD = localStorage.getItem('effectiveStartDate');

    this.employeementSD = localStorage.getItem('effectiveStartDate');

    this.addressSD = localStorage.getItem('effectiveStartDate');

    this.permanentEsd = localStorage.getItem('effectiveStartDate');

    this.empPresentAddress=JSON.parse(localStorage.getItem('presentAddress'));
    // console.log("empPresentAddress from constr:", this.empPresentAddress);

    this.empPermanentAddress=JSON.parse(localStorage.getItem('permanentAddress'));
    // console.log("empPermanentAddress from constr:",this.empPermanentAddress);

  }

  ngOnInit():void {

    // console.log("emp Id from onInit: ",this.empData.Employee_id);

    this.form1();

    this.form2();

    this.form3();

    this.form4();

    this.form5();

    this.today = this.getTodayDate(); //*** DOB validation ***

    this.maxDate = this.getMaxDate(); //*** DOB validation ***

    this.minDate = this.getMinDate(); //*** DOB validation ***

    // console.log("empmentDetails", this.empmentDetails.ORGANIZATION_NAME);

    // console.log("empmentDetails org name from onInit:", this.empmentDetails.ORGANIZATION_NAME);

    if(this.empmentDetails){
            this.editemp();
    }

    if(this.empPresentAddress){
            this.editPresentAddress();
            this.PresentAddressForm.disable();
            // console.log(this.empPresentAddress);
            
    }

    if (this.empPermanentAddress){
            this.editPermanentAddress();
            this.PermanentAddressForm.disable();
    }

    //***setting default values to respective presenter type ***

    if(this.candOrempFormUpdate.get('workerType').value === 'Candidate'){
      this.employementForm.patchValue({ personType:'Candidate'});
    }
    else this.employementForm.patchValue({ personType: 'Employee'});

  }



  collapse1(){
    this.isCollapsabled = !this.isCollapsabled;
  }

  collapse2(){
    this.isCollapsabled2 = !this.isCollapsabled2;
  }

  collapse3(){
    this.isCollapsabled3 = !this.isCollapsabled3;
  }

  collapse4(){
    this.isCollapsabled4 = !this.isCollapsabled4;
  }



// ***************************************** Candidate/Employee details **********************************************************************************

  // *** Form for showing info of Candi/Emp data ***

  form1(){ 
            // console.log("editemp",this.empData);
    // console.log(this.empData.Employee_First_Name);
    // console.log('presenter type:',this.empData.presentER_TYPE);


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

      // console.log("emp data from Frontend:",this.candOrempFormUpdate.value);
      
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

    this.isLoading = true;

    const EMPLOYEENUMBER = this.candOrempFormUpdate.get('employeeNumber');
    // console.log("emp number from update method:" ,EMPLOYEENUMBER.value);
    const ID = EMPLOYEENUMBER.value;
    const EMPID=this.empData.Employee_id;
    // console.log("EmpID from update method:",EMPID);
   
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

  //  console.log("Emp Data to backend:",empdata);

// ***Service for updating emp/candi data

    this.service.updateEmp(empdata,EMPID).subscribe((res:any)=>{

      this.isLoading = false;

      this.getempDetails(this.candOrempFormUpdate.value['startDate'],this.candOrempFormUpdate.value['employeeNumber']);

      // console.log("updateEmp Service res:",res);

      if (res && res.message) {
        // alert(res.message);
        this.msg = res.message;
      }
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${this.msg}`,
        showConfirmButton: false,
        timer: 2000,
      }).then(()=>{

        this.candOrempFormUpdate.disable();
        this.isEditable1 = !this.isEditable1;

      });

    },
    error=>{
      this.isLoading = false;
      // console.log(error);
      if (error.error && error.error.error) {
          // console.log(error);
        // this.updateFailMsg = true;
      this.msg = error.error.error;
      }

      Swal.fire({
        position:'top',
        icon: "error",
        title: "Oops...",
        text: `${this.msg}`,
        showConfirmButton: true,
        width:400,
      });      
    });
  }


  getempDetails(ESD,EMPNO){

    this.empAddService.sendDateOrEmpnumber(EMPNO,ESD,undefined).subscribe((res)=>{

      // console.log('ESD from getempDetails method:',ESD);
      // console.log("res from getempDetails method:",res['EMPLOYEE_DETAILS']);

      this.empData=res['EMPLOYEE_DETAILS'];
      localStorage.setItem('empData',JSON.stringify(this.empData) );

      // console.log("employeeData from getempDetails method:",this.empData);

      this.empmentDetails=res['Employement_Details'];
      this.empPresentAddress=res['Home_Address_Details'];
      // console.log("empPresentAddress",this.empPresentAddress);
      
      this.empPermanentAddress=res['present_Address_Details'];

      // console.log("employeementData from getempDetails method:",this.empmentDetails);

      if(this.empmentDetails){ this.editemp()}

      if (this.empPresentAddress){ this.editPresentAddress()}
  
      if (this.empPermanentAddress){this.editPermanentAddress() }
      
     },error=>{
      //  console.log("error from getempDetails method:",error);
     });
  
  }


//*** Emp/candidate search by ESD and EED***

  onStartDateChange(event:any){
    // console.log("start date change from emp/candi:",event.target.value);
        this.startDate = event.target.value;
        // console.log("Emp/Candi Start Date:",this.startDate);
  }

//*** Emp/candidate search by ESD and EED***

  onEndDateChange(event:any){
    // console.log("end date:",event.target.value);
        this.endDate = event.target.value;
        // console.log("Emp/Candi End Date",this.endDate); 
  }

//*** method for updating emp/candidate data */

  submitData(){
              this.isLoading = true;
    // console.log("emp start date change:",this.startDate);
    // console.log("emp end date change:",this.endDate);
    
        this.service.sendDate(this.startDate,this.empData.Employee_id,this.endDate).subscribe((res)=>{

          this.isLoading = false;
            // console.log("res from submitData",res);
          this.empRecord = res['data'];
            // console.log("submitData, empRecord.first name:",this.empRecord.Employee_First_Name);
            
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
          // console.log("emp data from submitData method:",this.candOrempFormUpdate);
        },
          error=>{
            this.isLoading = false;
            // console.log(error);
            if(error.error && error.error.message){
              // this.updateFailMsg = true;
              this.msg = error.error.message;

              Swal.fire({
                position:'top',
                icon: "error",
                title: "Oops...",
                text: `${this.msg}`,
                showConfirmButton: true,
                width:400,
              }); 
            }
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
    // console.log("employement data from frontend:",this.employementForm.value);
    
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

    this.isLoading = true;

    // console.log("data from employement Data method:",this.employementForm.value);

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
      Pre_Annual_Salary:this.employementForm.value['previousAnnualSalary'],
      Previous_Experience:this.employementForm.value['previousExp'],
      Total_Experience:this.employementForm.value['totalExp'],
      Probation_Period:this.employementForm.value['probationPeriod'],
      Notice_Period:this.employementForm.value['noticePeriod']
    }

    // console.log("employement data to backend",data);

    this.service.empData(this.empData.Employee_id,data).subscribe((res:any)=>{

      this.isLoading = false;

      // console.log("res from employement Data method:",res);
      
      if (res && res.message) {
        // alert(res.message);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title:`${res.message}`,
          showConfirmButton: false,
          timer: 1500
        }).then(()=>{
          this.employementForm.disable();
          this.isEditable2 = !this.isEditable2;
        });
      }
    },
    error=>{

      this.isLoading = false;
      console.log(error);
      if (error.error && error.error.message){
        // alert(error.error.message)
        Swal.fire({
          position:'top',
          icon: "error",
          title: "Oops...",
          text: `${error.error.message}`,
          showConfirmButton: true,
          width:400,
        });       
      }
      if (error.error && error.error.error){
        // alert(error.error.message)
        Swal.fire({
          position:'top',
          icon: "error",
          title: "Oops...",
          text: `${error.error.error}`,
          showConfirmButton: true,
          width:400,
        });       
      }
      else {
        // console.log(error);
        // alert("An error occurred: " + error.statusText);
          // alert(error.error.message)
          Swal.fire({
            position:'top',
            icon: "error",
            title: "Oops...",
            text: `An error occurred: ${error.statusText}`,
            showConfirmButton: true,
            width:400,
          });       
      } 
    });
  }


  onEmpStartDateChange(event:any){
    // console.log("Employement Start Date:",event.target.value);
      this.employementStartDate = event.target.value;
    // console.log("Employement Start date:",this.employementStartDate);  
  }


  onEmpEndDateChange(event:any){
    // console.log("Employement End Date:",event.target.value);
      this.empEndDate = event.target.value;
    // console.log("Employement end date:",this.empEndDate);
  }
  
  submitEmployementData(){

    this.isLoading = true;
    // console.log("Employement start date:",this.employementStartDate);
    
    // console.log("Employement end date:",this.empEndDate);

    this.service.empSendDate(this.employementStartDate,this.empData.Employee_id,this.empEndDate).subscribe((res)=>{
       this.isLoading = false;
      // console.log("res from submitEmployementData method:",res);
        this.filteredEmpData = res['data'];
        // console.log("filteredEmpData",this.filteredEmpData);
        
        
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
        previousAnnualSalary:[this.filteredEmpData.PRE_ANNUAL_SALARY,Validators.required],
        previousExp:[this.filteredEmpData.PREVIOUS_EXPERIENCE,Validators.required],
        totalExp:[this.filteredEmpData.TOTAL_EXPERIENCE,Validators.required],
        probationPeriod:[this.filteredEmpData.PROBATION_PERIOD,Validators.required],
        noticePeriod:[this.filteredEmpData.NOTICE_PERIOD,Validators.required]

      });

      // console.log("employement data***:",this.employementForm.value);
      
    },error =>{
      this.isLoading = false;
      // console.log(error);
      if (error.error && error.error.message){
        // console.log(error.error.message);
        Swal.fire({
          position:'top',
          icon: "error",
          title: "Oops...",
          text: `${error.error.message}`,
          showConfirmButton: true,
          width:400,
        });      
      }
      else {
        // console.log("An error occurred: " + error.statusText);
        Swal.fire({
          position:'top',
          icon: "error",
          title: "Oops...",
          text: `An error occurred: ${error.statusText}`,
          showConfirmButton: true,
          width:400,
        });      
      }
    });
  }


  editemp(){
    
    // console.log("this.empmentDetailsdit",this.empmentDetails);
    // console.log("this.empmentDetailsdit",this.empmentDetails.ORGANIZATION_NAME);

    // this.service.getEmpData(this.empData.Employee_id).subscribe((res)=>{

      // console.log("employement Details",res);
      // console.log(this.empData.Employee_id);
      // this.empDataDetails=res['data'];

      // console.log("empmentdetails:",this.empmentDetails.ORGANIZATION_NAME);
      

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
        previousAnnualSalary:[this.empmentDetails.PRE_ANNUAL_SALARY,Validators.required],
        previousExp:[this.empmentDetails.PREVIOUS_EXPERIENCE,Validators.required],
        totalExp:[this.empmentDetails.TOTAL_EXPERIENCE,Validators.required],
        probationPeriod:[this.empmentDetails.PROBATION_PERIOD,Validators.required],
        noticePeriod:[this.empmentDetails.NOTICE_PERIOD,Validators.required]

      });

      // console.log("employement form data from editemp method:",this.employementForm.value);
      
      this.employementForm.disable();
      // });
  }


  // ****************************************** Employee  Address details **********************************************************************************

  
  form3(){

      this.PresentAddressForm = this.formbulider.group({

        employeeId:[this.empData.Employee_id],
        presentAddressType:['Present',Validators.required],
        presentAddress:['',Validators.required],
        presentState:['',Validators.required],
        presentCountry:['',Validators.required],
        presentCity:['',Validators.required],
        presentPincode:['',Validators.required],
        presentEffectiveStartDate:[,Validators.required],
        presentEffectiveEndDate:['4712-12-31',Validators.required]  

      });

      // console.log("present Address data from frontend:",this.PresentAddressForm.value);
      this.PresentAddressForm.disable();

  }




  presentaddressData(){

    this.isLoading = true;

    // console.log("Home Address data from addressData method:",this.PresentAddressForm.value);

    const presentaddressData = {
      Date_From:this.PresentAddressForm.value['presentEffectiveStartDate'],
      Date_To:this.PresentAddressForm.value['presentEffectiveEndDate'],
      Address_Type:this.PresentAddressForm.value['presentAddressType'],
      Address:this.PresentAddressForm.value['presentAddress'],
      Employee_Id:this.PresentAddressForm.value['employeeId'],
      City:this.PresentAddressForm.value['presentCity'],
      State:this.PresentAddressForm.value['presentState'],
      Country:this.PresentAddressForm.value['presentCountry'],
      Pin_Code:this.PresentAddressForm.value['presentPincode'],
    }
      // console.log("Present Address data to backend:",presentaddressData);

      this.service.address(presentaddressData).subscribe((res:any)=>{

        this.isLoading = false;

        // console.log("res from address api:",res);

        if (res && res.message){
          // alert(res.message);

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${res.message}`,
            showConfirmButton: false,
            timer: 1500
          }).then(()=>{
            this.PresentAddressForm.disable();
            // this.isEditable3 = !this.isEditable3;
          });
        }

        // console.log(" present Address stored Successfully");
   
    },error =>{

      this.isLoading = false;
        // console.log("error from address api:",error);
        if (error.error && error.error.message) {
          // alert(error.error.message); 
          Swal.fire({
            position:'top',
            icon: "error",
            title: "Oops...",
            text: `${error.error.message}`,
            showConfirmButton: true,
            width:400,
          });      
        }
    });
  }

  editPresentAddress(){

      this.PresentAddressForm = this.formbulider.group({

        presentEffectiveStartDate:[formatDate(this.empPresentAddress.DATE_FROM, 'yyyy-MM-dd','en'),Validators.required],
        presentEffectiveEndDate:[formatDate(this.empPresentAddress.DATE_TO, 'yyyy-MM-dd','en'),Validators.required],
        presentAddressType:[this.empPresentAddress.ADDRESS_TYPE,Validators.required],
        employeeId:[this.empData.Employee_id],
        presentAddress:[this.empPresentAddress.ADDRESS,Validators.required],
        presentCity:[this.empPresentAddress.CITY,Validators.required],
        presentState:[this.empPresentAddress.STATE,Validators.required],
        presentCountry:[this.empPresentAddress.COUNTRY,Validators.required],
        presentPincode:[this.empPresentAddress.PIN_CODE,Validators.required] 

      });

      // console.log("present Address form editPresentAddress method:",this.PresentAddressForm.value);
      
  }




  presentAddressSearch(){
  // console.log("this.presentEnd",this.presentEnd);
    const addressType='Present';
    this.isLoading = true;
    // console.log("ESD",this.addressSD);
    // console.log("PeffectiveEndDate",this.PeffectiveEndDate);
    this.service.searchPrsentAddress(this.empData.Employee_id,this.addressSD,this.presentEnd,addressType).subscribe((res)=>{
      this.isLoading = false;
      // console.log("res",res);
      this.presentAddressData=res['data'];
      // console.log("this.presentAddressData",this.presentAddressData);
      this.PresentAddressForm = this.formbulider.group({
 
        presentEffectiveStartDate:[formatDate(this.presentAddressData.DATE_FROM, 'yyyy-MM-dd','en'),Validators.required],
        presentEffectiveEndDate:[formatDate(this.presentAddressData.DATE_TO, 'yyyy-MM-dd','en'),Validators.required],
        presentAddressType:[this.presentAddressData.ADDRESS_TYPE,Validators.required],
        employeeId:[this.empData.Employee_id],
        presentAddress:[this.presentAddressData.ADDRESS,Validators.required],
        presentCity:[this.presentAddressData.CITY,Validators.required],
        presentState:[this.presentAddressData.STATE,Validators.required],
        presentCountry:[this.presentAddressData.COUNTRY,Validators.required],
        presentPincode:[this.presentAddressData.PIN_CODE,Validators.required]
      });
     
    },error=>{
      this.isLoading = false;
      // console.log(error);
      if (error.error && error.error.message) {
        // alert(error.error.message); 
        Swal.fire({
          position:'top',
          icon: "error",
          title: "Oops...",
          text: `${error.error.message}`,
          showConfirmButton: true,
          width:400,
        });      
      }
      if (error.error && error.error.error) {
        // alert(error.error.message); 
        Swal.fire({
          position:'top',
          icon: "error",
          title: "Oops...",
          text: `${error.error.error}`,
          showConfirmButton: true,
          width:400,
        });      
      }

    });
 
  }

  presentEsdAddress(event:any){
    this.presentEnd=event.target.value;
  //  console.log("Esd",this.presentEnd);
  
 }



  form4(){

    this.PermanentAddressForm = this.formbulider.group({
      employeeId:[this.empData.Employee_id],
      permanentaddressType:['Permanent',Validators.required],
      permanentaddress:['',Validators.required],
      permanentstate:['',Validators.required],
      permanentcountry:['',Validators.required],
      permanentcity:['',Validators.required],
      permanentpincode:['',Validators.required],
      permanenteffectiveStartDate:[,Validators.required],
      permanenteffectiveEndDate:['4712-12-31',Validators.required]  
    });

      // console.log("permanent Address data from frontend:",this.PermanentAddressForm.value);
      this.PermanentAddressForm.disable();

  }

  permanentaddressData(){

      this.isLoading = true;
      const permanentAddressData = {
        Date_From:this.PermanentAddressForm.value['permanenteffectiveStartDate'],
        Date_To:this.PermanentAddressForm.value['permanenteffectiveEndDate'],
        Address_Type:this.PermanentAddressForm.value['permanentaddressType'],
        Address:this.PermanentAddressForm.value['permanentaddress'],
        Employee_Id:this.PermanentAddressForm.value['employeeId'],
        City:this.PermanentAddressForm.value['permanentcity'],
        State:this.PermanentAddressForm.value['permanentstate'],
        Country:this.PermanentAddressForm.value['permanentcountry'],
        Pin_Code:this.PermanentAddressForm.value['permanentpincode'],  
      }

      // console.log("Present Address data to backend:",permanentAddressData);
      this.service.address(permanentAddressData).subscribe((res:any)=>{
        this.isLoading = false;
        // console.log("res from address api:",res);

        if (res && res.message){
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${res.message}`,
            showConfirmButton: false,
            timer: 1500
          }).then(()=>{
            this.PermanentAddressForm.disable();
            this.isEditable3 = !this.isEditable3;
          });
    
          // alert(res.message);
        }

        // console.log(" Permanent Address stored Successfully");
   
    },error =>{
      this.isLoading = false;
        // console.log("error from address api:",error);
        if (error.error && error.error.message) {
          // alert(error.error.message); 
          Swal.fire({
            position:'top',
            icon: "error",
            title: "Oops...",
            text: `${error.error.message}`,
            showConfirmButton: true,
            width:400,
          });      
        }
    });
  }

  editPermanentAddress(){

      this.PermanentAddressForm = this.formbulider.group({
        permanenteffectiveStartDate:[formatDate(this.empPermanentAddress.DATE_FROM, 'yyyy-MM-dd','en'),Validators.required],
        permanenteffectiveEndDate:[formatDate(this.empPermanentAddress.DATE_TO, 'yyyy-MM-dd','en'),Validators.required],
        permanentaddressType:[this.empPermanentAddress.ADDRESS_TYPE,Validators.required],
        employeeId:[this.empData.Employee_id],
        permanentaddress:[this.empPermanentAddress.ADDRESS,Validators.required],
        permanentcity:[this.empPermanentAddress.CITY,Validators.required],
        permanentstate:[this.empPermanentAddress.STATE,Validators.required],
        permanentcountry:[this.empPermanentAddress.COUNTRY,Validators.required],
        permanentpincode:[this.empPermanentAddress.PIN_CODE,Validators.required]  

      });
      // console.log("Permanent Address form editPermanentAddress method:",this.PermanentAddressForm.value);
  }


  permanentAddEnd(event:any){
    this.permanentEnd=event.target.value;
    // console.log("this.permanentEnd",this.permanentEnd);
  }


  permanentAddressSearch(){
    this.isLoading = true;

    const AddressType='Permanent'
    this.service.searcPhermanentAddress(this.empData.Employee_id,this.permanentEsd,this.permanentEnd,AddressType).subscribe((res)=>{
      this.isLoading = false;
      // console.log("res",res);
      this.permanentAddressData=res['data']
      // console.log("this.permanentAddressData",this.permanentAddressData);
      this.PermanentAddressForm = this.formbulider.group({
        permanenteffectiveStartDate:[formatDate(this.permanentAddressData.DATE_FROM, 'yyyy-MM-dd','en'),Validators.required],
        permanenteffectiveEndDate:[formatDate(this.permanentAddressData.DATE_TO, 'yyyy-MM-dd','en'),Validators.required],
        permanentaddressType:[this.permanentAddressData.ADDRESS_TYPE,Validators.required],
        employeeId:[this.empData.Employee_id],
        permanentaddress:[this.permanentAddressData.ADDRESS,Validators.required],
        permanentcity:[this.permanentAddressData.CITY,Validators.required],
        permanentstate:[this.permanentAddressData.STATE,Validators.required],
        permanentcountry:[this.permanentAddressData.COUNTRY,Validators.required],
        permanentpincode:[this.permanentAddressData.PIN_CODE,Validators.required]  
 
      });
    },error=>{
      this.isLoading = false;
      // console.log(error);
      if (error.error && error.error.message) {
        // alert(error.error.message); 
        Swal.fire({
          position:'top',
          icon: "error",
          title: "Oops...",
          text: `${error.error.message}`,
          showConfirmButton: true,
          width:400,
        });      
      }
      if (error.error && error.error.error) {
        // alert(error.error.message); 
        Swal.fire({
          position:'top',
          icon: "error",
          title: "Oops...",
          text: `${error.error.error}`,
          showConfirmButton: true,
          width:400,
        });      
      }

    });
  }

  toggleEdit3(): void {
    this.isEditable3 = !this.isEditable3;
    if (this.isEditable3) {
      this.PresentAddressForm.enable();
      this.PermanentAddressForm.enable();
    } else {
      this.PresentAddressForm.disable();
      this.PermanentAddressForm.disable();
      // this.form3();
      // this.form4();
    }
  }

  //address data incase  permenantaddress presenaddress same.
 
copyAddressDetails(event){
  if (event.target.checked) {
    this.PermanentAddressForm.patchValue({
      permanenteffectiveStartDate:this.PresentAddressForm.get('presentEffectiveStartDate')?.value,
      permanenteffectiveEndDate:this.PresentAddressForm.get('presentEffectiveEndDate')?.value,
      permanentaddress: this.PresentAddressForm.get('presentAddress')?.value,
      permanentcity: this.PresentAddressForm.get('presentCity')?.value,
      permanentstate: this.PresentAddressForm.get('presentState')?.value,
      permanentcountry: this.PresentAddressForm.get('presentCountry')?.value,
      permanentpincode: this.PresentAddressForm.get('presentPincode')?.value
    });
  } else {
    this.PermanentAddressForm.reset({
      permanenteffectiveStartDate: '',
      permanenteffectiveEndDate: '4712-12-31',
      permanentaddressType: 'Permanent',
      employeeId: this.empData.Employee_id,
      permanentaddress: '',
      permanentcity: '',
      permanentstate: '',
      permanentcountry: '',
      permanentpincode: ''
    });
  }
}


/******************************************************* Emergency Contact details *********************************************************/


form5(){

  this.emergencyDetailsForm = this.formbulider.group({

    personname:['',Validators.required],
    relation:['',Validators.required],
    contact:['',Validators.required],
    bloodgroup:['',Validators.required]

  });
      console.log("Emergency data from frontend:",this.emergencyDetailsForm.value);
      this.emergencyDetailsForm.disable();
}

emergencyData(){

this.isLoading = true;

  const emergencyData = {
    Person_Name:this.emergencyDetailsForm.value['personname'],
    Relation:this.emergencyDetailsForm.value['relation'],
    Contact:this.emergencyDetailsForm.value['contact'],
    Blood_Group:this.emergencyDetailsForm.value['bloodgroup']
  }

  this.service.emergencyDetails(this.emergencyDetailsForm).subscribe((res:any)=>{

    this.isLoading = false;

    console.log("res from emergency api:",res);

    if (res && res.message){
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${res.message}`,
        showConfirmButton: false,
        timer: 1500
      }).then(()=>{
        this.emergencyDetailsForm.disable();
        this.isEditable4 = !this.isEditable4;
      });
      // alert(res.message);
    }
  },error =>{
    this.isLoading = false;
    console.log("error from emergency api:",error);
    if (error.error && error.error.error) {
      // alert(error.error.message);
      this.emergMsg = error.error.error;
    }
    if(error.error && error.error.message){
      this.emergMsg  = error.error.message;
    }
    else{
      this.emergMsg = error.error.statusText;
    }
    Swal.fire({
      position:'top',
      icon: "error",
      title: "Oops...",
      text: `${this.emergMsg}`,
      showConfirmButton: true,
      width:400,
    });      

});

}




toggleEdit4(): void {
  this.isEditable4 = !this.isEditable4;
  if (this.isEditable4) {
    this.emergencyDetailsForm.enable();
  } else {
    this.emergencyDetailsForm.disable();
  }
}





}
