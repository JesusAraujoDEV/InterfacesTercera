import { useState } from "react"
import UserIcon from "../../assets/icons/user1.svg"
import HealthIcon from "../../assets/icons/run1.svg"
import WorkIcon from "../../assets/icons/work1.svg"
import LocationIcon from "../../assets/icons/location.svg"
import BankIcon from "../../assets/icons/bank.png"
import TechIcon from "../../assets/icons/tech.png"
import CryptoIcon from "../../assets/icons/wallet.png"
import UserMap from "../common/UserMap"


export default function ProfileWizardExpanded({ user, onSave, onCancel }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Información Personal
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    maidenName: user?.maidenName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    username: user?.username || "",
    password: user?.password || "",
    birthDate: user?.birthDate || "",
    age: user?.age || "",
    gender: user?.gender || "",
    image: user?.image || "",

    // Información Física
    height: user?.height || "",
    weight: user?.weight || "",
    bloodGroup: user?.bloodGroup || "",
    eyeColor: user?.eyeColor || "",
    hairColor: user?.hair?.color || "",
    hairType: user?.hair?.type || "",

    // Información Académica/Profesional
    university: user?.university || "",
    company: user?.company?.name || "",
    department: user?.company?.department || "",
    title: user?.company?.title || "",

    // Dirección Personal
    address: user?.address?.address || "",
    city: user?.address?.city || "",
    state: user?.address?.state || "",
    stateCode: user?.address?.stateCode || "",
    postalCode: user?.address?.postalCode || "",
    country: user?.address?.country || "",
    coordinates: {
      lat: user?.address?.coordinates?.lat || "",
      lng: user?.address?.coordinates?.lng || "",
    },

    // Dirección de la Empresa
    companyAddress: user?.company?.address?.address || "",
    companyCity: user?.company?.address?.city || "",
    companyState: user?.company?.address?.state || "",
    companyStateCode: user?.company?.address?.stateCode || "",
    companyPostalCode: user?.company?.address?.postalCode || "",
    companyCountry: user?.company?.address?.country || "",
    companyCoordinates: {
      lat: user?.company?.address?.coordinates?.lat || "",
      lng: user?.company?.address?.coordinates?.lng || "",
    },

    // Información Bancaria
    cardExpire: user?.bank?.cardExpire || "",
    cardNumber: user?.bank?.cardNumber || "",
    cardType: user?.bank?.cardType || "",
    currency: user?.bank?.currency || "",
    iban: user?.bank?.iban || "",

    // Información Legal/Fiscal
    ein: user?.ein || "",
    ssn: user?.ssn || "",

    // Información Técnica
    ip: user?.ip || "",
    macAddress: user?.macAddress || "",
    userAgent: user?.userAgent || "",

    // Criptomonedas
    cryptoCoin: user?.crypto?.coin || "",
    cryptoWallet: user?.crypto?.wallet || "",
    cryptoNetwork: user?.crypto?.network || "",

    // Sistema
    role: user?.role || "",
  })

  const [errors, setErrors] = useState({})
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)

  const steps = [
    {
      id: 1,
      title: "Información Personal",
      description: "Datos básicos y contacto",
      icon: UserIcon,
    },
    {
      id: 2,
      title: "Información Física",
      description: "Datos físicos y características",
      icon: HealthIcon,
    },
    {
      id: 3,
      title: "Información Profesional",
      description: "Universidad y trabajo",
      icon: WorkIcon,
    },
    {
      id: 4,
      title: "Dirección Personal",
      description: "Ubicación de residencia",
      icon: LocationIcon,
    },
    {
      id: 5,
      title: "Información Bancaria",
      description: "Datos financieros",
      icon: BankIcon,
    },
    {
      id: 6,
      title: "Información Técnica",
      description: "Datos técnicos y legales",
      icon: TechIcon,
    },
    {
      id: 7,
      title: "Criptomonedas y Sistema",
      description: "Crypto y configuración",
      icon: CryptoIcon,
    },
  ]

  // Función para calcular edad automáticamente
  const calculateAge = (birthDate) => {
    if (!birthDate) return ""
    const today = new Date()
    const birth = new Date(birthDate)
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    return age
  }

  const validateStep = (step) => {
    const newErrors = {}

    switch (step) {
      case 1:
        if (!formData.firstName.trim() || formData.firstName.length < 2 || formData.firstName.length > 50) newErrors.firstName = "El nombre es requerido (2-50 caracteres)"
        if (!formData.lastName.trim() || formData.lastName.length < 2 || formData.lastName.length > 50) newErrors.lastName = "El apellido es requerido (2-50 caracteres)"
        if (!formData.email.trim()) newErrors.email = "El email es requerido"
        else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) newErrors.email = "Email inválido"
        if (!formData.phone.trim()) newErrors.phone = "El teléfono es requerido"
        else if (!/^\+\d{7,15}$/.test(formData.phone.replace(/\s/g, ''))) newErrors.phone = "El teléfono debe tener formato internacional, ej: +584144019911"
        if (!formData.birthDate) newErrors.birthDate = "La fecha de nacimiento es requerida"
        else {
          const birthDate = new Date(formData.birthDate)
          const today = new Date()
          const age = today.getFullYear() - birthDate.getFullYear()
          if (age < 0 || age > 150) newErrors.birthDate = "La edad debe estar entre 0 y 150 años"
        }
        if (!formData.gender) newErrors.gender = "El género es requerido"
        if (formData.username && (formData.username.length < 3 || formData.username.length > 30)) newErrors.username = "El nombre de usuario debe tener entre 3 y 30 caracteres"
        if (formData.password && formData.password.length < 6) newErrors.password = "La contraseña debe tener al menos 6 caracteres"
        break

      case 2:
        if (!formData.height || Number(formData.height) <= 0) newErrors.height = "La altura debe ser un número positivo"
        if (!formData.weight || Number(formData.weight) <= 0) newErrors.weight = "El peso debe ser un número positivo"
        // bloodGroup, eyeColor, hairColor, hairType are optional selects, no direct validation for "required"
        break

      case 3:
        if (formData.university && formData.university.length < 3) newErrors.university = "La universidad debe tener al menos 3 caracteres"
        // company, department, title are optional
        break

      case 4:
        if (!formData.address.trim()) newErrors.address = "La dirección es requerida"
        if (!formData.city.trim()) newErrors.city = "La ciudad es requerida"
        if (!formData.state.trim()) newErrors.state = "El estado es requerido"
        if (!formData.postalCode.trim()) newErrors.postalCode = "El código postal es requerido"
        if (formData.country && formData.country.length > 50) newErrors.country = "El país debe tener máximo 50 caracteres"
        // coordinates are optional
        // Company address fields are optional
        break
      case 5:
        if (formData.cardNumber && !/^\d{13,19}$/.test(formData.cardNumber.replace(/\s/g, ''))) newErrors.cardNumber = "Número de tarjeta inválido"
        if (formData.cardExpire && !/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.cardExpire)) newErrors.cardExpire = "Formato de fecha de expiración inválido (MM/YY)"
        // cardType, currency, iban are optional
        break
      case 6:
        if (formData.ip && !/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(formData.ip)) newErrors.ip = "Dirección IP inválida"
        if (formData.macAddress && !/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/.test(formData.macAddress)) newErrors.macAddress = "Formato de MAC inválido (ej: 00:1B:44:11:3A:B7)"
        // ssn, ein, userAgent are optional
        break
      case 7:
        // cryptoCoin, cryptoWallet, cryptoNetwork, role are optional
        break
    }

    // Validación global para image si está presente
    if (formData.image && !/^https?:\/\//.test(formData.image)) {
      newErrors.image = "La imagen debe ser una URL válida (http o https)"
    }

    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) {
      alert(Object.values(newErrors).join('\n'))
    }
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => {
      const newData = { ...prev, [field]: value }

      // Calcular edad automáticamente cuando cambia la fecha de nacimiento
      if (field === "birthDate") {
        newData.age = calculateAge(value)
      }

      return newData
    })

    // Limpiar error del campo
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleCoordinatesChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      coordinates: {
        ...prev.coordinates,
        [field]: value,
      },
    }))
  }

  const handleCompanyCoordinatesChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      companyCoordinates: {
        ...prev.companyCoordinates,
        [field]: value,
      },
    }))
  }

  const getCurrentLocation = () => {
    setIsLoadingLocation(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          handleCoordinatesChange("lat", position.coords.latitude.toFixed(6))
          handleCoordinatesChange("lng", position.coords.longitude.toFixed(6))
          setIsLoadingLocation(false)
          alert("¡Ubicación obtenida correctamente!")
        },
        (error) => {
          setIsLoadingLocation(false)
          let msg = "No se pudo obtener la ubicación. Por favor, ingresa las coordenadas manualmente."
          if (error.code === error.PERMISSION_DENIED) {
            msg = "Permiso denegado para acceder a la ubicación. Activa los permisos en tu navegador."
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            msg = "La información de ubicación no está disponible."
          } else if (error.code === error.TIMEOUT) {
            msg = "La solicitud de ubicación ha expirado. Intenta de nuevo."
          }
          alert(msg)
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      )
    } else {
      setIsLoadingLocation(false)
      alert("La geolocalización no es compatible con este navegador.")
    }
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length))
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    if (validateStep(currentStep)) {

      function cleanObject(obj) {
        if (obj === null || obj === undefined) return undefined;
        if (typeof obj === 'string' && obj.trim() === '') return undefined;
        if (typeof obj === 'number' && isNaN(obj)) return undefined;

        if (typeof obj === 'object' && !Array.isArray(obj)) {
          const cleaned = {};
          let hasValidData = false;
          for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
              const value = obj[key];
              const cleanedValue = cleanObject(value);
              if (cleanedValue !== undefined) {
                cleaned[key] = cleanedValue;
                hasValidData = true;
              }
            }
          }
          return hasValidData ? cleaned : undefined;
        }
        return obj;
      }

      let phone = formData.phone || user.phone || undefined;
      if (phone && !phone.startsWith('+')) {
        if (phone.startsWith('0')) {
          phone = '+58' + phone.slice(1);
        } else {
          phone = '+' + phone;
        }
      }

      let image = formData.image || user.image || undefined;
      if (image && !/^https?:\/\//.test(image)) {
        image = undefined;
      }

      const address = cleanObject({
        address: formData.address || (user.address ? user.address.address : undefined),
        city: formData.city || (user.address ? user.address.city : undefined),
        state: formData.state || (user.address ? user.address.state : undefined),
        stateCode: formData.stateCode || (user.address ? user.address.stateCode : undefined),
        postalCode: formData.postalCode || (user.address ? user.address.postalCode : undefined),
        country: formData.country || (user.address ? user.address.country : undefined),
        coordinates: formData.coordinates.lat || formData.coordinates.lng ? {
          lat: formData.coordinates.lat ? Number(formData.coordinates.lat) : (user.address && user.address.coordinates ? user.address.coordinates.lat : undefined),
          lng: formData.coordinates.lng ? Number(formData.coordinates.lng) : (user.address && user.address.coordinates ? user.address.coordinates.lng : undefined)
        } : undefined
      });

      const companyAddress = cleanObject({
        address: formData.companyAddress || (user.company?.address ? user.company.address.address : undefined),
        city: formData.companyCity || (user.company?.address ? user.company.address.city : undefined),
        state: formData.companyState || (user.company?.address ? user.company.address.state : undefined),
        stateCode: formData.companyStateCode || (user.company?.address ? user.company.address.stateCode : undefined),
        postalCode: formData.companyPostalCode || (user.company?.address ? user.company.address.postalCode : undefined),
        country: formData.companyCountry || (user.company?.address ? user.company.address.country : undefined),
        coordinates: formData.companyCoordinates.lat || formData.companyCoordinates.lng ? {
          lat: formData.companyCoordinates.lat ? Number(formData.companyCoordinates.lat) : (user.company?.address?.coordinates ? user.company.address.coordinates.lat : undefined),
          lng: formData.companyCoordinates.lng ? Number(formData.companyCoordinates.lng) : (user.company?.address?.coordinates ? user.company.address.coordinates.lng : undefined)
        } : undefined
      });

      const hair = cleanObject({
        color: formData.hairColor || (user.hair ? user.hair.color : undefined),
        type: formData.hairType || (user.hair ? user.hair.type : undefined)
      });

      const bank = cleanObject({
        cardExpire: formData.cardExpire || (user.bank ? user.bank.cardExpire : undefined),
        cardNumber: formData.cardNumber || (user.bank ? user.bank.cardNumber : undefined),
        cardType: formData.cardType || (user.bank ? user.bank.cardType : undefined),
        currency: formData.currency || (user.bank ? user.bank.currency : undefined),
        iban: formData.iban || (user.bank ? user.bank.iban : undefined),
      });

      const crypto = cleanObject({
        coin: formData.cryptoCoin || (user.crypto ? user.crypto.coin : undefined),
        wallet: formData.cryptoWallet || (user.crypto ? user.crypto.wallet : undefined),
        network: formData.cryptoNetwork || (user.crypto ? user.crypto.network : undefined),
      });

      const company = cleanObject({
        name: formData.company || (user.company ? user.company.name : undefined),
        department: formData.department || (user.company ? user.company.department : undefined),
        title: formData.title || (user.company ? user.company.title : undefined),
        address: companyAddress
      });

      const updatedUser = cleanObject({
        email: formData.email || user.email,
        username: formData.username || user.username,
        password: formData.password || user.password,
        firstName: formData.firstName || user.firstName,
        lastName: formData.lastName || user.lastName,
        maidenName: formData.maidenName || user.maidenName,
        age: formData.age || user.age,
        birthDate: formData.birthDate || user.birthDate,
        gender: formData.gender || user.gender,
        image: image || user.image,
        phone: phone || user.phone,
        height: formData.height ? Number(formData.height) : user.height,
        weight: formData.weight ? Number(formData.weight) : user.weight,
        bloodGroup: formData.bloodGroup || user.bloodGroup,
        eyeColor: formData.eyeColor || user.eyeColor,
        hair: hair,
        university: formData.university || user.university,
        company: company,
        address: address,
        bank: bank,
        ein: formData.ein || user.ein,
        ssn: formData.ssn || user.ssn,
        ip: formData.ip || user.ip,
        macAddress: formData.macAddress || user.macAddress,
        userAgent: formData.userAgent || user.userAgent,
        crypto: crypto,
        role: formData.role || user.role,
      });


      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/${user.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(updatedUser)
        });

        if (!res.ok) throw new Error('Error al actualizar el perfil');

        const newUser = await res.json();
        localStorage.setItem('user', JSON.stringify(newUser));
        window.location.reload();

      } catch (error) {
        console.error("Error al actualizar el perfil:", error);
        alert('No se pudo actualizar el perfil. ' + error.message);
      }
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ingresa tu nombre"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Apellido <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ingresa tu apellido"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Apellido de Soltera</label>
              <input
                type="text"
                value={formData.maidenName}
                onChange={(e) => handleInputChange("maidenName", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Apellido de soltera (opcional)"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="ejemplo@correo.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="+1234567890"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de Usuario</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => handleInputChange("username", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="usuario123"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha de Nacimiento <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => handleInputChange("birthDate", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Edad (Calculada)</label>
                <input
                  type="number"
                  value={formData.age}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600"
                  placeholder="Se calcula automáticamente"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Género <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seleccionar</option>
                  <option value="male">Masculino</option>
                  <option value="female">Femenino</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Foto de Perfil</label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => handleInputChange("image", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="URL de la imagen"
              />
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Altura (cm) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="100"
                  max="250"
                  value={formData.height}
                  onChange={(e) => handleInputChange("height", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="170"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Peso (kg) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="30"
                  max="300"
                  value={formData.weight}
                  onChange={(e) => handleInputChange("weight", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="70"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Sangre</label>
                <select
                  value={formData.bloodGroup}
                  onChange={(e) => handleInputChange("bloodGroup", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seleccionar</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Color de Ojos</label>
                <select
                  value={formData.eyeColor}
                  onChange={(e) => handleInputChange("eyeColor", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seleccionar</option>
                  <option value="Brown">Café</option>
                  <option value="Blue">Azul</option>
                  <option value="Green">Verde</option>
                  <option value="Hazel">Avellana</option>
                  <option value="Gray">Gris</option>
                  <option value="Amber">Ámbar</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Color de Cabello</label>
                <select
                  value={formData.hairColor}
                  onChange={(e) => handleInputChange("hairColor", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seleccionar</option>
                  <option value="Black">Negro</option>
                  <option value="Brown">Café</option>
                  <option value="Blonde">Rubio</option>
                  <option value="Red">Pelirrojo</option>
                  <option value="Gray">Gris</option>
                  <option value="White">Blanco</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Cabello</label>
                <select
                  value={formData.hairType}
                  onChange={(e) => handleInputChange("hairType", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seleccionar</option>
                  <option value="Straight">Liso</option>
                  <option value="Wavy">Ondulado</option>
                  <option value="Curly">Rizado</option>
                  <option value="Kinky">Muy Rizado</option>
                </select>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Universidad <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.university}
                onChange={(e) => handleInputChange("university", e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.university ? "border-red-500 bg-red-50" : "border-gray-300"
                }`}
                placeholder="Nombre de la universidad"
              />
              {errors.university && <p className="text-red-500 text-sm mt-1">{errors.university}</p>}
            </div>

            <div className="border-t pt-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Información Laboral</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Empresa</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nombre de la empresa"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Departamento</label>
                    <input
                      type="text"
                      value={formData.department}
                      onChange={(e) => handleInputChange("department", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ej: Desarrollo, Marketing"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Título de Trabajo</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ej: Desarrollador Senior"
                    />
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Dirección de la Empresa</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Dirección</label>
                      <input
                        type="text"
                        value={formData.companyAddress}
                        onChange={(e) => handleInputChange("companyAddress", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Calle y número de la empresa"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Ciudad</label>
                        <input
                          type="text"
                          value={formData.companyCity}
                          onChange={(e) => handleInputChange("companyCity", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Ciudad de la empresa"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                        <input
                          type="text"
                          value={formData.companyState}
                          onChange={(e) => handleInputChange("companyState", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Estado de la empresa"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Código de Estado</label>
                        <input
                          type="text"
                          value={formData.companyStateCode}
                          onChange={(e) => handleInputChange("companyStateCode", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Ej: CA, TX"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Código Postal</label>
                        <input
                          type="text"
                          value={formData.companyPostalCode}
                          onChange={(e) => handleInputChange("companyPostalCode", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="12345"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">País</label>
                        <input
                          type="text"
                          value={formData.companyCountry}
                          onChange={(e) => handleInputChange("companyCountry", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="País de la empresa"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Latitud</label>
                        <input
                          type="number"
                          step="any"
                          value={formData.companyCoordinates.lat}
                          onChange={(e) => handleCompanyCoordinatesChange("lat", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="19.4326"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Longitud</label>
                        <input
                          type="number"
                          step="any"
                          value={formData.companyCoordinates.lng}
                          onChange={(e) => handleCompanyCoordinatesChange("lng", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="-99.1332"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Dirección Personal</h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dirección <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Calle y número"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ciudad</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ciudad"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => handleInputChange("state", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Estado"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Código de Estado</label>
                <input
                  type="text"
                  value={formData.stateCode}
                  onChange={(e) => handleInputChange("stateCode", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ej: CA, TX"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Código Postal</label>
                <input
                  type="text"
                  value={formData.postalCode}
                  onChange={(e) => handleInputChange("postalCode", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="12345"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">País</label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => handleInputChange("country", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="País"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Latitud</label>
                <input
                  type="number"
                  step="any"
                  value={formData.coordinates.lat}
                  onChange={(e) => handleCoordinatesChange("lat", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="19.4326"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Longitud</label>
                <input
                  type="number"
                  step="any"
                  value={formData.coordinates.lng}
                  onChange={(e) => handleCoordinatesChange("lng", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="-99.1332"
                />
              </div>
            </div>

            <button
              onClick={getCurrentLocation}
              disabled={isLoadingLocation}
              className={`flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors ${
                isLoadingLocation ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoadingLocation ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243m10.606-10.607L13.414 3.1a1.998 1.998 0 00-2.828 0L6.343 7.343m10.606 10.607a4 4 0 11-5.656-5.656m5.656 5.656L13.414 12l-2.828 2.828m0 0l-4.243 4.243m4.243-4.243L12 13.414m0 0L16.657 17.657"></path>
                </svg>
              )}
              Obtener Ubicación Actual
            </button>
            <UserMap
              location={{
                lat: parseFloat(formData.coordinates.lat),
                lng: parseFloat(formData.coordinates.lng),
              }}
              onLocationChange={({ lat, lng }) => {
                handleCoordinatesChange("lat", lat.toFixed(6));
                handleCoordinatesChange("lng", lng.toFixed(6));
              }}
            />
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Información Bancaria</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Número de Tarjeta</label>
                <input
                  type="text"
                  value={formData.cardNumber}
                  onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="1234 5678 9012 3456"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de Expiración</label>
                <input
                  type="text"
                  value={formData.cardExpire}
                  onChange={(e) => handleInputChange("cardExpire", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="MM/YY"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Tarjeta</label>
                <select
                  value={formData.cardType}
                  onChange={(e) => handleInputChange("cardType", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seleccionar</option>
                  <option value="Visa">Visa</option>
                  <option value="Mastercard">Mastercard</option>
                  <option value="American Express">American Express</option>
                  <option value="Elo">Elo</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Moneda</label>
                <input
                  type="text"
                  value={formData.currency}
                  onChange={(e) => handleInputChange("currency", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="USD, EUR, CNY"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">IBAN</label>
                <input
                  type="text"
                  value={formData.iban}
                  onChange={(e) => handleInputChange("iban", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="IBAN"
                />
              </div>
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Información Técnica y Legal</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Dirección IP</label>
                <input
                  type="text"
                  value={formData.ip}
                  onChange={(e) => handleInputChange("ip", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="192.168.1.1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Dirección MAC</label>
                <input
                  type="text"
                  value={formData.macAddress}
                  onChange={(e) => handleInputChange("macAddress", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="00:1B:44:11:3A:B7"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">SSN</label>
                <input
                  type="text"
                  value={formData.ssn}
                  onChange={(e) => handleInputChange("ssn", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="123-45-6789"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">EIN</label>
                <input
                  type="text"
                  value={formData.ein}
                  onChange={(e) => handleInputChange("ein", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="12-3456789"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">User Agent</label>
              <textarea
                value={formData.userAgent}
                onChange={(e) => handleInputChange("userAgent", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
                placeholder="Mozilla/5.0 (Windows NT 10.0; Win64; x64)..."
              />
            </div>
          </div>
        )

      case 7:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Criptomonedas y Sistema</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Criptomoneda</label>
                <select
                  value={formData.cryptoCoin}
                  onChange={(e) => handleInputChange("cryptoCoin", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seleccionar</option>
                  <option value="Bitcoin">Bitcoin</option>
                  <option value="Ethereum">Ethereum</option>
                  <option value="Litecoin">Litecoin</option>
                  <option value="Dogecoin">Dogecoin</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Wallet</label>
                <input
                  type="text"
                  value={formData.cryptoWallet}
                  onChange={(e) => handleInputChange("cryptoWallet", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0x..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Network</label>
                <input
                  type="text"
                  value={formData.cryptoNetwork}
                  onChange={(e) => handleInputChange("cryptoNetwork", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ej: ERC-20, BEP-20"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rol del Usuario</label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => handleInputChange("role", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ej: Administrador, Usuario"
              />
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-4xl">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-2xl font-bold text-gray-800">Asistente de Perfil</h2>
          <div className="text-gray-600">
            Paso {currentStep} de {steps.length}
          </div>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center">
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                    currentStep >= step.id ? "bg-blue-600" : "bg-gray-300"
                  }`}
                >
                  {step.icon && <img src={step.icon} alt={step.title} className="w-5 h-5" />}
                  {!step.icon && step.id}
                </div>
                <div
                  className={`text-sm mt-2 text-center ${
                    currentStep >= step.id ? "text-blue-600" : "text-gray-500"
                  }`}
                >
                  {step.title}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex-1 h-1 ${
                  index < steps.length - 1
                    ? currentStep > step.id
                      ? "bg-blue-600"
                      : "bg-gray-300"
                    : ""
                } ${index < steps.length - 1 ? (currentStep > step.id ? "mr-1" : "") : ""}`}
              ></div>
            ))}
          </div>
        </div>

        <div className="mb-8 min-h-[300px]">{renderStepContent()}</div>

        <div className="flex justify-between mt-8">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:text-gray-400 disabled:border-gray-200 disabled:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Anterior
          </button>

          <div className="flex space-x-3">
            <button
              onClick={onCancel}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>

            {currentStep < steps.length ? (
              <button
                onClick={nextStep}
                className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Siguiente
                <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-stone-700 text-white rounded-md hover:bg-stone-800 transition-colors"
              >
                Guardar Perfil
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}