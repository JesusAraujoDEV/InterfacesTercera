import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-wizard-expanded',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile-wizard-expanded.html',
  styleUrl: './profile-wizard-expanded.css'
})
export class ProfileWizardExpanded {
  @Input() user: any;
  @Output() onSave = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();

  currentStep = 1;
  steps = [
    { id: 1, title: 'Información Personal', description: 'Datos básicos y contacto', icon: 'user1.svg' },
    { id: 2, title: 'Información Física', description: 'Datos físicos y características', icon: 'run1.svg' },
    { id: 3, title: 'Información Profesional', description: 'Universidad y trabajo', icon: 'work1.svg' },
    { id: 4, title: 'Dirección Personal', description: 'Ubicación de residencia', icon: 'location.svg' },
    { id: 5, title: 'Información Bancaria', description: 'Datos financieros', icon: 'bank.png' },
    { id: 6, title: 'Información Técnica', description: 'Datos técnicos y legales', icon: 'tech.png' },
    { id: 7, title: 'Criptomonedas y Sistema', description: 'Crypto y configuración', icon: 'wallet.png' },
  ];

  form: FormGroup;
  isLoadingLocation = false;
  errors: any = {};

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      // Paso 1
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      maidenName: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      username: [''],
      password: [''],
      birthDate: ['', Validators.required],
      age: [''],
      gender: ['', Validators.required],
      image: [''],
      // Paso 2
      height: ['', Validators.required],
      weight: ['', Validators.required],
      bloodGroup: [''],
      eyeColor: [''],
      hairColor: [''],
      hairType: [''],
      // Paso 3
      university: [''],
      company: [''],
      department: [''],
      title: [''],
      // Paso 4
      address: [''],
      city: [''],
      state: [''],
      stateCode: [''],
      postalCode: [''],
      country: [''],
      coordinates: this.fb.group({ lat: [''], lng: [''] }),
      companyAddress: [''],
      companyCity: [''],
      companyState: [''],
      companyStateCode: [''],
      companyPostalCode: [''],
      companyCountry: [''],
      companyCoordinates: this.fb.group({ lat: [''], lng: [''] }),
      // Paso 5
      cardExpire: [''],
      cardNumber: [''],
      cardType: [''],
      currency: [''],
      iban: [''],
      // Paso 6
      ein: [''],
      ssn: [''],
      ip: [''],
      macAddress: [''],
      userAgent: [''],
      // Paso 7
      cryptoCoin: [''],
      cryptoWallet: [''],
      cryptoNetwork: [''],
      role: [''],
    });
  }

  ngOnInit() {
    if (this.user) {
      this.form.patchValue(this.userToForm(this.user));
    }
  }

  userToForm(user: any) {
    // Adaptar los datos del usuario al formato del formulario
    return {
      ...user,
      hairColor: user?.hair?.color || '',
      hairType: user?.hair?.type || '',
      coordinates: user?.address?.coordinates || { lat: '', lng: '' },
      companyCoordinates: user?.company?.address?.coordinates || { lat: '', lng: '' },
      company: user?.company?.name || '',
      department: user?.company?.department || '',
      title: user?.company?.title || '',
      companyAddress: user?.company?.address?.address || '',
      companyCity: user?.company?.address?.city || '',
      companyState: user?.company?.address?.state || '',
      companyStateCode: user?.company?.address?.stateCode || '',
      companyPostalCode: user?.company?.address?.postalCode || '',
      companyCountry: user?.company?.address?.country || '',
      cardExpire: user?.bank?.cardExpire || '',
      cardNumber: user?.bank?.cardNumber || '',
      cardType: user?.bank?.cardType || '',
      currency: user?.bank?.currency || '',
      iban: user?.bank?.iban || '',
      cryptoCoin: user?.crypto?.coin || '',
      cryptoWallet: user?.crypto?.wallet || '',
      cryptoNetwork: user?.crypto?.network || '',
    };
  }

  nextStep() {
    if (this.currentStep < this.steps.length) {
      this.currentStep++;
    }
  }
  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }
  handleCancel() {
    this.onCancel.emit();
  }
  handleSave() {
    if (this.form.valid) {
      this.onSave.emit(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
  // Placeholder para obtener ubicación
  getCurrentLocation() {
    this.isLoadingLocation = true;
    setTimeout(() => {
      this.isLoadingLocation = false;
      alert('Ubicación simulada (placeholder)');
    }, 1000);
  }

  get companyCoordinatesGroup(): FormGroup {
    return this.form.get('companyCoordinates') as FormGroup;
  }
  get coordinatesGroup(): FormGroup {
    return this.form.get('coordinates') as FormGroup;
  }
}
