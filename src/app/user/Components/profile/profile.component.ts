import { Component, OnInit } from '@angular/core';
import { Profile } from '../../Models/profile';
import { ProfileService } from '../../Services/profile.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {

  profileDetails: Profile = {
    fullName: "",
    email: "",
    address: "",
    birthDate: new Date(),
    nid: "",
    nidPhoto: "",
    personalPhoto: "",
    phoneNumber: "",
  };
  selectedFile!: File;
  imageSrc: string | ArrayBuffer | null = null;

  profilePicForm: FormGroup;
  profileForm: FormGroup;
  constructor(private profileService: ProfileService, private route: ActivatedRoute) {
    this.profileForm = new FormGroup({
      fullName:new FormControl(this.profileDetails.fullName,[Validators.required,Validators.minLength(8)]),
      email:new FormControl(this.profileDetails.email,[Validators.required,Validators.email]),
      address:new FormControl(this.profileDetails.address,[Validators.required]),
      nid:new FormControl(this.profileDetails.nid,[Validators.required,Validators.minLength(14),Validators.maxLength(14)]),
      nidPhoto:new FormControl(this.profileDetails.nidPhoto,[Validators.required]),
      // personalPhoto: new FormControl(this.profileDetails.personalPhoto, [Validators.required]),
      phoneNumber: new FormControl(this.profileDetails.phoneNumber, [Validators.required]),
    })

    this.profilePicForm = new FormGroup({

      personalPhoto: new FormControl(this.profileDetails.personalPhoto, [Validators.required]),
    })
   }

  ngOnInit(): void {
    console.log('on init .......')
    this.getProfileDetails();
    this.profileForm.valueChanges.subscribe({
      next:(response)=>{
        this.profileDetails=response;
      }
    });

    ///////// form for pic //////////////
    this.profilePicForm.valueChanges.subscribe({
      next:(response)=>{
        this.profileDetails.personalPhoto=response.personalPhoto;
      }
    });
  }

  getProfileDetails(): void {
    this.route.paramMap.subscribe(params => {
      this.profileService.getProfile().subscribe({
        next: (data) => {
          this.profileDetails = data;
              console.log(this.profileDetails)

        },
        error: (error) => {
          console.error(error);
        }
      });
    });
  }

  calculateAge(birthdate: Date): number {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }

  selectFile(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];

    // Read the selected file as a data URL
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageSrc = e.target.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  uploadPhoto(): void {
    if (this.selectedFile) {
      this.profileService.uploadPhoto(this.selectedFile).subscribe({
        next: (response) => {
          // Handle the response from the server if necessary
          console.log("Photo uploaded successfully");
        },
        error: (error) => {
          console.error("Error uploading photo:", error);
        }
      });
    } else {
      console.log("No file selected");
    }
  }

  saveChanges(): void {
    this.profileService.updateProfile(this.profileDetails).subscribe({
      next: (response) => {
        console.log('Profile updated successfully:', response);
        this.profileDetails = response;
        console.log(this.profileDetails.personalPhoto)
      },
      error: (error) => {
        console.error('Error updating profile:', error);
        console.log('Error message:', error.message);
        console.log('Validation errors:', error.error.errors);
      }
    });
    console.log(this.profileDetails);
  }
}
