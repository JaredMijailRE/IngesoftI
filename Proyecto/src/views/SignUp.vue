<script setup> // js
//import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { ref, computed } from 'vue';

const showPassword = ref(false)
const showPassword2 = ref(false)

const email = ref('')
const username = ref('')
const firstnames = ref('')
const lastnames = ref('')
const password = ref('')
const verifypassword = ref('')

const errors = ref([])

function handleSubmit() {
  errors.value = {}
    if (!email.value){
        errors.value.email = 'El correo es obligatorio.'
  } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.value)) {
    errors.value.email = 'El correo no es válido.'
  }
  if (!username.value) {
    errors.value.username = 'El nombre de usuario es obligatorio.'
  }

  if (!firstnames.value) {
    errors.value.firstName = 'El nombre es obligatorio.'
  }

  if (!lastnames.value) {
    errors.value.lastName = 'El apellido es obligatorio.'
  }

  if (!password.value) {
    errors.value.password = 'La contraseña es obligatoria.'
  } else if (password.value.length < 8) {
    errors.value.password = 'La contraseña debe tener al menos 8 caracteres.'
  }

  if (!verifypassword.value) {
    errors.value.verifypassword = 'Debes confirmar la contraseña.'
  } else if (verifypassword.value !== password.value) {
    errors.value.verifypassword = 'Las contraseñas no coinciden.'
  }

  
  if (Object.keys(errors.value).length === 0) {
    alert('✅ ¡Registro válido! ✅')
    
  }

};

</script>

<template> <!-- html -->
       
<div class="min-h-screen bg-gradient-to-t from-sportu-200 from-10% via-sportu-300 via-20% to-sportu-600 py-9">
    <div class="flex justify-center">
        <div class="card hover:shadow-lg bg-blue-50 transition-shadow w-1/3 flex-col px-8 py-8 ">
            <img class="w-40 h-40 mx-auto my-5 rounded-full object-cover" src="/src/assets/patin_logo.jpg" alt="Logo sportU">
            <h1 class="text-2xl text-center font-bold text-gray-700 mb-4">Bienvenid@ a SportU!</h1>
            <h1 class="text-1xl font-bold text-secondary-600 mb-2">Crea tu cuenta</h1>
            <input v-model="email" class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-sportu-400 hover:border-slate-300 shadow-sm focus:shadow mb-2" placeholder="Correo":class="{ 'border-red-500': errors.email }" >
            <p v-if="errors.email" class="text-sm text-red-500 mb-2">{{ errors.email }}</p>
            <input v-model="username" class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-sportu-400 hover:border-slate-300 shadow-sm focus:shadow mb-2" placeholder="Nombre de Usuario":class="{'border-red-500':errors.username}">
            <p v-if="errors.username" class="text-sm text-red-500 mb-2">{{ errors.username }}</p>
            <input v-model="firstnames" class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-sportu-400 hover:border-slate-300 shadow-sm focus:shadow mb-2" placeholder="Nombres":class="{'border-red-500':errors.firstnames}">
            <p v-if="errors.lastnames" class="text-sm text-red-500 mb-2">{{ errors.lastnames }}</p>
            <input v-model="lastnames" class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-sportu-400 hover:border-slate-300 shadow-sm focus:shadow mb-2" placeholder="Apellidos":class="{'border-red-500':errors.lastnames}">
            <p v-if="errors.lastnames" class="text-sm text-red-500 mb-2">{{ errors.lastnames }}</p>
            <div class="relative">
                <input :type="showPassword ? 'text' : 'password'" id="contraseña" v-model="password" class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-sportu-400 hover:border-slate-300 shadow-sm focus:shadow mb-2" placeholder="Contraseña":class="{'border-red-500':errors.password}">
                <p v-if="errors.password" class="text-sm text-red-500 mb-2">{{ errors.password }}</p>
                <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-blue-600 hover:underline">
                {{ showPassword ? 'Ocultar' : 'Ver' }}
                </button>
            </div>    

                
            <div class="relative">
            <input :type="showPassword2? 'text' : 'password'" id="verificar_contraseña" v-model="verifypassword" class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-sportu-400 hover:border-slate-300 shadow-sm focus:shadow mb-2" placeholder="Verificar Contraseña":class="{'border-red-500':errors.verifypassword}">
            <p v-if="errors.verifypassword" class="text-sm text-red-500 mb-2">{{ errors.verifypassword }}</p>
            <button
            type="button"
            @click="showPassword2 = !showPassword2"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-blue-600 hover:underline">
            {{ showPassword2 ? 'Ocultar' : 'Ver' }}
            </button>
            </div>

            <div class="flex justify-center p-10 pt-2 gap-7">
            <button type="button" @click = "handleSubmit" class="w-full bg-sportu-600 hover:bg-sportu-700 text-white font-bold py-2 px-4 rounded ">Registrarse</button>
            </div>
            
        </div>
    </div>
</div> 
 
</template>

<style> /* css */

</style>