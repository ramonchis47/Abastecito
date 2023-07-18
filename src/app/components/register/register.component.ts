import { Component, OnInit } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  loading: boolean = true;
  showModal: boolean = false;
  name: string = '';
  last_names: string = '';
  email: string = '';
  phone: string = '';
  password: string = '';
  errorMessage: string = "";

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  registrarUsuario(): void {
    const auth = getAuth();

    if (!this.name.match(/^[a-zA-Z\s']+$/) || !this.last_names.match(/^[a-zA-Z\s']+$/)) {
      this.errorMessage = "Error en el nombre de usuario y/o apellido"
      this.showModal = !this.showModal
    }
    else {
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          alert("Se registro el usuario")
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
          alert(`Error: ${errorMessage} ${errorCode}`)
        });
    }


  }
}
