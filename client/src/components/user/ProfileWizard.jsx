import { useState } from "react"
import UserIcon from "../../assets/icons/user1.svg"
import HealthIcon from "../../assets/icons/run1.svg"
import WorkIcon from "../../assets/icons/work1.svg"
import LocationIcon from "../../assets/icons/location.svg"

export default function ProfileWizard({ user, onCancel }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    birthDate: user?.birthDate || "",
    gender: user?.gender || "",
    height: user?.height || "",
    weight: user?.weight || "",
    bloodGroup: user?.bloodGroup || "",
    eyeColor: user?.eyeColor || "",
    hairColor: user?.hair?.color || "",
    university: user?.university || "",
    company: user?.company?.name || "",
    department: user?.company?.department || "",
    title: user?.company?.title || "",
    address: user?.address?.address || "",
    city: user?.address?.city || "",
    state: user?.address?.state || "",
    postalCode: user?.address?.postalCode || "",
    coordinates: {
      lat: user?.address?.coordinates?.lat || "",
      lng: user?.address?.coordinates?.lng || "",
    },
    image: user?.image || "",
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
      title: "Dirección y Ubicación",
      description: "Datos de ubicación",
      icon: LocationIcon,
    },
  ]

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
        break

      case 2:
        if (!formData.birthDate) newErrors.birthDate = "La fecha de nacimiento es requerida"
        else {
          const birthDate = new Date(formData.birthDate)
          const today = new Date()
          const age = today.getFullYear() - birthDate.getFullYear()
          if (age < 0 || age > 150) newErrors.birthDate = "La edad debe estar entre 0 y 150 años"
        }
        if (!formData.gender) newErrors.gender = "El género es requerido"
        if (!formData.height || Number(formData.height) <= 0) newErrors.height = "La altura debe ser un número positivo"
        if (!formData.weight || Number(formData.weight) <= 0) newErrors.weight = "El peso debe ser un número positivo"
        break

      case 3:
        if (formData.university && formData.university.length < 3) newErrors.university = "La universidad debe tener al menos 3 caracteres"
        break

      case 4:
        if (!formData.address.trim()) newErrors.address = "La dirección es requerida"
        if (!formData.city.trim()) newErrors.city = "La ciudad es requerida"
        if (!formData.state.trim()) newErrors.state = "El estado es requerido"
        if (!formData.postalCode.trim()) newErrors.postalCode = "El código postal es requerido"
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
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }))
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

  const getCurrentLocation = () => {
    setIsLoadingLocation(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          handleCoordinatesChange("lat", position.coords.latitude)
          handleCoordinatesChange("lng", position.coords.longitude)
          setIsLoadingLocation(false)
        },
        (error) => {
          console.error("Error getting location:", error)
          setIsLoadingLocation(false)
          alert("No se pudo obtener la ubicación. Por favor, ingresa las coordenadas manualmente.")
        },
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
      // Limpiar el objeto para no enviar campos vacíos ni strings vacíos y solo los permitidos
      const allowedFields = [
        'email', 'password', 'username', 'firstName', 'lastName', 'maidenName', 'age', 'gender', 'phone', 'birthDate', 'image', 'bloodGroup', 'height', 'weight', 'eyeColor', 'ip', 'macAddress', 'university', 'ein', 'ssn', 'userAgent',
        'hair', 'address', 'bank', 'company', 'crypto'
      ];
      function cleanObject(obj) {
        if (obj === null || obj === undefined) return undefined;
        if (typeof obj === 'string' && obj.trim() === '') return undefined;
        if (typeof obj === 'object' && !Array.isArray(obj)) {
          const cleaned = {};
          Object.entries(obj).forEach(([key, value]) => {
            if (allowedFields.includes(key) || typeof value === 'object') {
              const cleanedValue = cleanObject(value);
              if (cleanedValue !== undefined) cleaned[key] = cleanedValue;
            }
          });
          return Object.keys(cleaned).length > 0 ? cleaned : undefined;
        }
        return obj;
      }

      // Validar y transformar phone
      let phone = formData.phone || user.phone || undefined;
      if (phone && !phone.startsWith('+')) {
        // Si es venezolano y empieza por 0, asume +58
        if (phone.startsWith('0')) {
          phone = '+58' + phone.slice(1);
        } else {
          phone = '+' + phone;
        }
      }

      // Validar image como URL
      let image = formData.image || user.image || undefined;
      if (image && !/^https?:\/\//.test(image)) {
        image = undefined;
      }

      // Limpiar address
      const address = cleanObject({
        address: formData.address || (user.address ? user.address.address : undefined),
        city: formData.city || (user.address ? user.address.city : undefined),
        state: formData.state || (user.address ? user.address.state : undefined),
        stateCode: formData.stateCode || (user.address ? user.address.stateCode : undefined),
        postalCode: formData.postalCode || (user.address ? user.address.postalCode : undefined),
        coordinates: cleanObject({
          lat: formData.coordinates.lat ? Number(formData.coordinates.lat) : (user.address && user.address.coordinates ? user.address.coordinates.lat : undefined),
          lng: formData.coordinates.lng ? Number(formData.coordinates.lng) : (user.address && user.address.coordinates ? user.address.coordinates.lng : undefined)
        }),
        country: formData.country || (user.address ? user.address.country : undefined)
      });

      // Limpiar hair
      const hair = cleanObject({
        color: formData.hairColor || (user.hair ? user.hair.color : undefined),
        type: formData.hairType || (user.hair ? user.hair.type : undefined)
      });

      const updatedUser = cleanObject({
        email: formData.email || user.email,
        username: formData.username || user.username,
        firstName: formData.firstName || user.firstName,
        lastName: formData.lastName || user.lastName,
        maidenName: formData.maidenName || user.maidenName,
        age: formData.age ? Number(formData.age) : undefined,
        gender: formData.gender || user.gender,
        phone,
        birthDate: formData.birthDate || user.birthDate,
        image,
        bloodGroup: formData.bloodGroup || user.bloodGroup,
        height: formData.height ? Number(formData.height) : undefined,
        weight: formData.weight ? Number(formData.weight) : undefined,
        eyeColor: formData.eyeColor || user.eyeColor,
        ip: formData.ip || user.ip,
        macAddress: formData.macAddress || user.macAddress,
        university: formData.university || user.university,
        ein: formData.ein || user.ein,
        ssn: formData.ssn || user.ssn,
        userAgent: formData.userAgent || user.userAgent,
        hair,
        address,
        bank: cleanObject({
          cardExpire: formData.cardExpire || (user.bank ? user.bank.cardExpire : undefined),
          cardNumber: formData.cardNumber || (user.bank ? user.bank.cardNumber : undefined),
          cardType: formData.cardType || (user.bank ? user.bank.cardType : undefined),
          currency: formData.currency || (user.bank ? user.bank.currency : undefined),
          iban: formData.iban || (user.bank ? user.bank.iban : undefined)
        }),
        company: cleanObject({
          department: formData.department || (user.company ? user.company.department : undefined),
          name: formData.company || (user.company ? user.company.name : undefined),
          title: formData.title || (user.company ? user.company.title : undefined),
          address: cleanObject({
            address: formData.companyAddress || (user.company && user.company.address ? user.company.address.address : undefined),
            city: formData.companyCity || (user.company && user.company.address ? user.company.address.city : undefined),
            state: formData.companyState || (user.company && user.company.address ? user.company.address.state : undefined),
            postalCode: formData.companyPostalCode || (user.company && user.company.address ? user.company.address.postalCode : undefined),
            country: formData.companyCountry || (user.company && user.company.address ? user.company.address.country : undefined)
          })
        }),
        crypto: cleanObject({
          coin: formData.coin || (user.crypto ? user.crypto.coin : undefined),
          wallet: formData.wallet || (user.crypto ? user.crypto.wallet : undefined),
          network: formData.network || (user.crypto ? user.crypto.network : undefined)
        })
      });
      console.log('Payload enviado al backend:', JSON.stringify(updatedUser, null, 2));
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
      } catch {
        alert('No se pudo actualizar el perfil.');
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
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    errors.firstName ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                  placeholder="Ingresa tu nombre"
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Apellido <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    errors.lastName ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                  placeholder="Ingresa tu apellido"
                />
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.email ? "border-red-500 bg-red-50" : "border-gray-300"
                }`}
                placeholder="ejemplo@correo.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Teléfono <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.phone ? "border-red-500 bg-red-50" : "border-gray-300"
                }`}
                placeholder="+1234567890"
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
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
              <p className="text-xs text-gray-500 mt-1">Opcional: URL de tu foto de perfil</p>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha de Nacimiento <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={formData.birthDate}
                onChange={(e) => handleInputChange("birthDate", e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.birthDate ? "border-red-500 bg-red-50" : "border-gray-300"
                }`}
              />
              {errors.birthDate && <p className="text-red-500 text-sm mt-1">{errors.birthDate}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Género <span className="text-red-500">*</span>
              </label>
              <div className="flex space-x-6">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === "male"}
                    onChange={(e) => handleInputChange("gender", e.target.value)}
                    className="mr-2 text-blue-600 focus:ring-blue-500 h-4 w-4"
                  />
                  <span className="text-sm text-gray-700">Masculino</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === "female"}
                    onChange={(e) => handleInputChange("gender", e.target.value)}
                    className="mr-2 text-blue-600 focus:ring-blue-500 h-4 w-4"
                  />
                  <span className="text-sm text-gray-700">Femenino</span>
                </label>
              </div>
              {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
            </div>

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
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    errors.height ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                  placeholder="170"
                />
                {errors.height && <p className="text-red-500 text-sm mt-1">{errors.height}</p>}
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
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    errors.weight ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                  placeholder="70"
                />
                {errors.weight && <p className="text-red-500 text-sm mt-1">{errors.weight}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  <option value="brown">Café</option>
                  <option value="blue">Azul</option>
                  <option value="green">Verde</option>
                  <option value="hazel">Avellana</option>
                  <option value="gray">Gris</option>
                  <option value="amber">Ámbar</option>
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
                  <option value="black">Negro</option>
                  <option value="brown">Café</option>
                  <option value="blonde">Rubio</option>
                  <option value="red">Pelirrojo</option>
                  <option value="gray">Gris</option>
                  <option value="white">Blanco</option>
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
              <h4 className="text-lg font-medium text-gray-900 mb-4">Información Laboral (Opcional)</h4>

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
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dirección <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.address ? "border-red-500 bg-red-50" : "border-gray-300"
                }`}
                placeholder="Calle y número"
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ciudad <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    errors.city ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                  placeholder="Ciudad"
                />
                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estado <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => handleInputChange("state", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    errors.state ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                  placeholder="Estado"
                />
                {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Código Postal <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.postalCode}
                onChange={(e) => handleInputChange("postalCode", e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.postalCode ? "border-red-500 bg-red-50" : "border-gray-300"
                }`}
                placeholder="12345"
              />
              {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>}
            </div>

            <div className="border-t pt-6">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-medium text-gray-900">Coordenadas GPS</h4>
                <button
                  type="button"
                  onClick={getCurrentLocation}
                  disabled={isLoadingLocation}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {isLoadingLocation ? (
                    <>
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>Obteniendo...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span>Obtener Ubicación</span>
                    </>
                  )}
                </button>
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

              <p className="text-xs text-gray-500 mt-2">
                💡 Tip: Usa el botón "Obtener Ubicación" para llenar automáticamente las coordenadas con tu ubicación
                actual.
              </p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
        {/* Header del wizard */}
        <div className="px-6 py-4 border-b border-gray-200 sticky top-0 bg-white">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Editar Perfil</h2>
            <button
              onClick={onCancel}
              className="text-gray-500 hover:text-gray-700 transition-colors p-2 hover:bg-gray-100 rounded-full"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              {steps.map((step, index) => (
                <div key={step.id} className={`flex items-center ${index < steps.length - 1 ? "flex-1" : ""}`}>
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                      step.id <= currentStep ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {step.id <= currentStep ? (
                      step.id < currentStep ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <img src={step.icon || "/placeholder.svg"} alt={step.title} className="w-5 h-5" />
                      )
                    ) : (
                      step.id
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-2 transition-colors ${
                        step.id < currentStep ? "bg-blue-600" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900">{steps[currentStep - 1].title}</h3>
              <p className="text-sm text-gray-600">{steps[currentStep - 1].description}</p>
            </div>
          </div>
        </div>

        {/* Contenido del paso actual */}
        <div className="px-6 py-8">{renderStepContent()}</div>

        {/* Botones de navegación */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-between sticky bottom-0">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
                className="px-6 py-2 bg-stone-700 text-white rounded-md hover:bg-stone-800 transition-colors font-medium"
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
