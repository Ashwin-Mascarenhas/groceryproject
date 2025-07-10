import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService, UserProfile } from '../profile.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  profileForm: FormGroup;
  loading = false;
  error: string | null = null;
  success: string | null = null;

  constructor(private fb: FormBuilder, private profileService: ProfileService) {
    this.profileForm = this.fb.group({
      username: [{ value: '', disabled: true }],
      email: [{ value: '', disabled: true }],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      phoneNumber: [''],
      addressLine1: [''],
      addressLine2: [''],
      city: [''],
      state: [''],
      postalCode: [''],
      country: ['']
    });
  }

  ngOnInit(): void {
    this.loadProfile();
  }

  /**
   * Fetch user profile from backend
   */
  loadProfile(): void {
    this.loading = true;
    this.error = null;
    this.profileService.getProfile().subscribe({
      next: (profile) => {
        this.profileForm.patchValue(profile);
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load profile.';
        this.loading = false;
      }
    });
  }

  /**
   * Submit profile update
   */
  onSubmit(): void {
    if (this.profileForm.invalid) return;
    this.loading = true;
    this.error = null;
    this.success = null;
    const updated: UserProfile = { ...this.profileForm.getRawValue() };
    this.profileService.updateProfile(updated).subscribe({
      next: (profile) => {
        this.success = 'Profile updated successfully!';
        this.loading = false;
        this.profileForm.patchValue(profile);
      },
      error: () => {
        this.error = 'Failed to update profile.';
        this.loading = false;
      }
    });
  }

  get f() { return this.profileForm.controls; }
}
