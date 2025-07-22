// schemas/user_schema.js
const Joi = require('joi');

const id = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(8); // Mínimo 8 caracteres para contraseñas

// Campos planos - Ahora permitiendo null para algunos y "" para otros según los errores
const firstName = Joi.string().min(2).max(50); // No parece necesitar allow(null) por tu body
const lastName = Joi.string().min(2).max(50).allow(null); // Permitir null para lastName
const maidenName = Joi.string().min(2).max(50).allow(null);
const age = Joi.number().integer().min(0).max(150); // Tu body tiene 0, lo cual es válido
const gender = Joi.string().valid('male', 'female', 'other').allow(null); // Permitir null y valores específicos
const phone = Joi.string().pattern(/^\+\d{1,3}\s?\d{4,14}$/).allow(null);
const username = Joi.string().alphanum().min(3).max(30);
const birthDate = Joi.date().allow(null); // Permitir null para birthDate
const image = Joi.string().uri().allow(null).allow(''); // Permitir null y cadenas vacías para URLs opcionales
const bloodGroup = Joi.string().length(2).pattern(/^(A|B|AB|O)[+-]$/i).allow(null);
const height = Joi.number().positive().allow(null); // Permitir null para height
const weight = Joi.number().positive().allow(null); // Permitir null para weight
const eyeColor = Joi.string().min(3).max(20).allow(null).allow('');
const ip = Joi.string().ip({ version: ['ipv4', 'ipv6'] }).allow(null).allow('');
const macAddress = Joi.string().pattern(/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/).allow(null).allow('');
const university = Joi.string().min(3).allow(null).allow('');
const ein = Joi.string().pattern(/^\d{3}-\d{7}$/).allow(null).allow('');
const ssn = Joi.string().pattern(/^\d{3}-\d{2}-\d{4}$/).allow(null).allow('');
const userAgent = Joi.string().max(500).allow(null).allow('');
const role = Joi.string().valid('admin', 'customer', 'supplier', 'guest').allow(null);

// Campos anidados como objetos Joi
const hairSchema = Joi.object({
    color: Joi.string().allow(null).allow(''), // Permitir null y cadenas vacías para hair.color
    type: Joi.string().allow(null).allow(''), // Permitir null y cadenas vacías para hair.type
}).optional();

const coordinatesSchema = Joi.object({
    lat: Joi.number().allow(null),
    lng: Joi.number().allow(null),
}).optional();

const addressSchema = Joi.object({
    address: Joi.string().allow(null).allow(''), // Permitir null y cadenas vacías para address.address
    city: Joi.string().allow(null).allow(''),
    state: Joi.string().allow(null).allow(''),
    stateCode: Joi.string().allow(null).allow(''),
    postalCode: Joi.string().allow(null).allow(''),
    coordinates: coordinatesSchema,
    country: Joi.string().allow(null).allow(''),
}).optional();

const bankSchema = Joi.object({
    cardExpire: Joi.string().pattern(/^\d{2}\/\d{2}$/).allow(null).allow(''), // MM/YY
    cardNumber: Joi.string().pattern(/^\d{13,19}$/).allow(null).allow(''), // Rango común de números de tarjeta
    cardType: Joi.string().allow(null).allow(''),
    currency: Joi.string().length(3).uppercase().allow(null).allow(''), // Ej: USD, EUR
    iban: Joi.string().alphanum().min(15).max(34).allow(null).allow(''), // Formato IBAN
}).optional();

const companySchema = Joi.object({
    department: Joi.string().allow(null).allow(''), // Permitir null y cadenas vacías para company.department
    name: Joi.string().allow(null).allow(''),
    title: Joi.string().allow(null).allow(''),
    address: addressSchema, // Puede ser otra instancia de addressSchema si la dirección de la compañía es diferente
}).optional();

const cryptoSchema = Joi.object({
    coin: Joi.string().allow(null).allow(''), // Permitir null y cadenas vacías para crypto.coin
    wallet: Joi.string().pattern(/^0x[a-fA-F0-9]{40}$/).allow(null).allow(''), // Ejemplo para direcciones Ethereum
    network: Joi.string().allow(null).allow(''),
}).optional();


// ===============================================
// Esquemas principales de validación de usuario
// ===============================================

const createUserSchema = Joi.object({
    email: email.required(),
    password: password.required(),
    username: username.required(),
    role: role.optional(),

    // Campos planos
    firstName: firstName.optional(),
    lastName: lastName.optional(),
    maidenName: maidenName.optional(),
    age: age.optional(),
    gender: gender.optional(),
    phone: phone.optional(),
    birthDate: birthDate.optional(),
    image: image.optional(),
    bloodGroup: bloodGroup.optional(),
    height: height.optional(),
    weight: weight.optional(),
    eyeColor: eyeColor.optional(),
    ip: ip.optional(),
    macAddress: macAddress.optional(),
    university: university.optional(),
    ein: ein.optional(),
    ssn: ssn.optional(),
    userAgent: userAgent.optional(),

    // Campos anidados
    hair: hairSchema,
    address: addressSchema,
    bank: bankSchema,
    company: companySchema,
    crypto: cryptoSchema,
});

const updateUserSchema = Joi.object({
    email: email.optional(),
    password: password.optional(),
    username: username.optional(),
    role: role.optional(),

    // Campos planos
    firstName: firstName.optional(),
    lastName: lastName.optional(),
    maidenName: maidenName.optional(),
    age: age.optional(),
    gender: gender.optional(),
    phone: phone.optional(),
    birthDate: birthDate.optional(),
    image: image.optional(),
    bloodGroup: bloodGroup.optional(),
    height: height.optional(),
    weight: weight.optional(),
    eyeColor: eyeColor.optional(),
    ip: ip.optional(),
    macAddress: macAddress.optional(),
    university: university.optional(),
    ein: ein.optional(),
    ssn: ssn.optional(),
    userAgent: userAgent.optional(),

    // Campos anidados
    hair: hairSchema,
    address: addressSchema,
    bank: bankSchema,
    company: companySchema,
    crypto: cryptoSchema,
});

const getUserSchema = Joi.object({
    id: id.required()
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema };