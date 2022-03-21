import { ThrowStmt } from '@angular/compiler';
import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent{

  miFormulario: FormGroup = this.fb.group({
    name:['Test 5', [Validators.required]],
    email: ['test5@test.com', [Validators.required, Validators.email]],
    password: ['145yyyy', [Validators.required, Validators.minLength(6)]]
  })

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService) { }

  register(){

    const{name, email, password} = this.miFormulario.value;
    this.authService.registro(name, email, password)
    .subscribe(resp => {
      if (resp === true){
        this.router.navigateByUrl('/dashboard');
      }else{
        Swal.fire('Error',resp, 'error');
      }
    });
  }
}
