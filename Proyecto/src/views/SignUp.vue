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



</script>

<template> <!-- html -->
       
<div class="min-h-screen bg-gradient-to-t from-sportu-200 from-10% via-sportu-300 via-20% to-sportu-600 py-9">
    <div class="flex justify-center">
        <div class="card hover:shadow-lg transition-shadow w-1/3 flex-col px-8 py-8">
            <img class="w-40 mx-auto my-5 rounded-full object-cover" src="/src/assets/patin_logo.jpg" alt="Logo sportU">
            <h1 class="text-2xl text-center font-bold text-gray-700 mb-4">Bienvenid@ a SportU!</h1>
            <h1 class="text-1xl font-bold text-secondary-600 mb-2">Crea tu cuenta</h1>
            <input class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-sportu-400 hover:border-slate-300 shadow-sm focus:shadow mb-2" placeholder="Correo">
            <input class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-sportu-400 hover:border-slate-300 shadow-sm focus:shadow mb-2" placeholder="Nombre de Usuario">
            <input class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-sportu-400 hover:border-slate-300 shadow-sm focus:shadow mb-2" placeholder="Nombres">
            <input class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-sportu-400 hover:border-slate-300 shadow-sm focus:shadow mb-2" placeholder="Apellidos">
            <div class="relative">
                <input :type="showPassword ? 'text' : 'password'" id="contraseña" class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-sportu-400 hover:border-slate-300 shadow-sm focus:shadow mb-2" placeholder="Contraseña">
                <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-blue-600 hover:underline">
                {{ showPassword ? 'Ocultar' : 'Ver' }}
                </button>
            </div>    

                
            <div class="relative">
            <input :type="showPassword2? 'text' : 'password'" id="verificar_contraseña"class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-sportu-400 hover:border-slate-300 shadow-sm focus:shadow mb-2" placeholder="Verificar Contraseña">

            <button
            type="button"
            @click="showPassword2 = !showPassword2"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-blue-600 hover:underline">
            {{ showPassword2 ? 'Ocultar' : 'Ver' }}
            </button>
            </div>

            <div class="flex justify-center p-10 pt-2 gap-7">
            <button class="w-full bg-sportu-600 hover:bg-sportu-700 text-white font-bold py-2 px-4 rounded">Registrarse</button>
            </div>
            
        </div>
    </div>
</div> 
 
</template>

<style> /* css */

</style>