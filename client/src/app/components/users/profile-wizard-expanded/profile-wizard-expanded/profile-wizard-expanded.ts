import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../../../../environments/environment';

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
  successMsg: string | null = null;
  errorMsg: string | null = null;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      // Paso 1
      firstName: [''],
      lastName: [''],
      maidenName: [''],
      email: [''],
      phone: [''],
      username: [''],
      password: [''],
      birthDate: [''],
      age: [''],
      gender: [''],
      image: [''],
      // Paso 2
      height: [''],
      weight: [''],
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
  async handleSave() {
    if (this.form.valid) {
      const formValue = this.form.value;
      // Transformar datos a la estructura esperada por el backend
      const address = {
        address: this.user?.address?.address || '',
        city: formValue.city || this.user?.address?.city || '',
        state: this.user?.address?.state || '',
        stateCode: this.user?.address?.stateCode || '',
        postalCode: this.user?.address?.postalCode || '',
        country: formValue.country || this.user?.address?.country || '',
        coordinates: this.user?.address?.coordinates || {},
      };
      const company = {
        name: formValue.company || this.user?.company?.name || '',
        department: this.user?.company?.department || '',
        title: this.user?.company?.title || '',
        address: {
          address: this.user?.company?.address?.address || '',
          city: this.user?.company?.address?.city || '',
          state: this.user?.company?.address?.state || '',
          stateCode: this.user?.company?.address?.stateCode || '',
          postalCode: this.user?.company?.address?.postalCode || '',
          country: this.user?.company?.address?.country || '',
          coordinates: this.user?.company?.address?.coordinates || {},
        }
      };
      const bank = {
        cardExpire: this.user?.bank?.cardExpire || '',
        cardNumber: formValue.cardNumber || this.user?.bank?.cardNumber || '',
        cardType: this.user?.bank?.cardType || '',
        currency: this.user?.bank?.currency || '',
        iban: this.user?.bank?.iban || '',
      };
      const hair = {
        color: this.user?.hair?.color || '',
        type: this.user?.hair?.type || '',
      };
      const crypto = {
        coin: this.user?.crypto?.coin || '',
        wallet: formValue.cryptoWallet || this.user?.crypto?.wallet || '',
        network: this.user?.crypto?.network || '',
      };
      // Formatear phone a internacional
      let phone = formValue.phone || this.user?.phone || '';
      if (phone && !phone.startsWith('+')) {
        phone = '+58 ' + phone.replace(/^0+/, '');
      }
      // Armar el objeto final
      const updatedUser: any = {
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        maidenName: formValue.maidenName || '',
        email: formValue.email,
        phone,
        username: formValue.username || '',
        password: formValue.password || '',
        birthDate: formValue.birthDate,
        age: Number(formValue.age) || this.user?.age || 0,
        gender: formValue.gender,
        image: formValue.image || '',
        height: formValue.height,
        weight: formValue.weight,
        bloodGroup: formValue.bloodGroup || '',
        eyeColor: formValue.eyeColor || '',
        hair,
        university: formValue.university || '',
        company,
        address,
        bank,
        ein: formValue.ein || '',
        ssn: formValue.ssn || '',
        ip: formValue.ip || '',
        macAddress: formValue.macAddress || '',
        userAgent: formValue.userAgent || '',
        crypto,
        role: formValue.role || '',
      };
      // Solo enviar los campos que cambiaron
      const updated: any = {};
      for (const key of Object.keys(updatedUser)) {
        if (typeof updatedUser[key] === 'object' && updatedUser[key] !== null) {
          if (JSON.stringify(updatedUser[key]) !== JSON.stringify(this.user?.[key])) {
            updated[key] = updatedUser[key];
          }
        } else if (updatedUser[key] !== (this.user?.[key] ?? '')) {
          updated[key] = updatedUser[key];
        }
      }
      if (Object.keys(updated).length === 0) {
        this.successMsg = 'No hay cambios para guardar.';
        setTimeout(() => this.successMsg = null, 2000);
        this.onSave.emit(this.user);
        return;
      }
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${environment.BACKEND_URL}/api/users/${this.user.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(updated)
        });
        if (!res.ok) throw new Error('No se pudo guardar el perfil');
        const newUser = await res.json();
        this.successMsg = 'Perfil guardado correctamente.';
        setTimeout(() => this.successMsg = null, 2000);
        this.onSave.emit(newUser);
      } catch (e) {
        this.errorMsg = 'Error al guardar el perfil';
        setTimeout(() => this.errorMsg = null, 2000);
      }
    } else {
      this.form.markAllAsTouched();
      this.errorMsg = 'Por favor completa los campos requeridos.';
      setTimeout(() => this.errorMsg = null, 2000);
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
