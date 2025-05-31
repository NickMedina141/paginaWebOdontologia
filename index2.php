<?php 
  session_start();
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inicio</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="icon" href="img/logo-odontologia ICO.ico">
    <link rel="stylesheet" href="css/styleIndex.css">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css">

<body>
    <header class="cabeza">
        <!-- Inicio del navbar -->
    <nav class="navbar navbar-expand-lg navbar-gradient">
        <div class="container-fluid">
          <a class="navbar-brand" href="#" style="color: #000000;"><img src="img/logo.png" width="30%" alt="Error" ></a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="index2.php" style="color: #000000;">Inicio</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#servicios" style="color: #000000;">Servicios</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#nosotros" style="color: #000000;">Nosotros</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#contacto" style="color: #000000;">Contacto</a>
              </li>
              </ul> 
              
              <div class="d-flex align-items-center">
                <?php if(isset($_SESSION['email']) && isset($_SESSION['cedula'])): ?>
                
                  <div class="d-flex align-items-center">
                    <a href="vista/panelPaciente.html?cedula=<?php echo $_SESSION['cedula']; ?>"><button class="btn btn-outline-primary rounded-pill px-4 py-2"><span>Entrar</span></button></a>
                    <button class="btn btn-danger"><span class="Entrar" data-bs-toggle="modal" data-bs-target="#inicio">Salir</span></button></a>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor"
                    class="bi bi-person-circle me-2" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                    </svg>

                  </div>
                  <?php else:?>
                    <a class="nav-link" href="#" style="color: #000000;">
                  <button class="btn btn-primary"><span class="Entrar" data-bs-toggle="modal" data-bs-target="#inicio">Iniciar Sesión</span></button></a>
                    <?php endif; ?>
              </div>
            
          </div>
        </div>
      </nav>
      <!-- Fin del navbar -->
    </header>


    <main>
    <section id="inicioSection" class="bg-light-blue py-5">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-6 mb-4 mb-md-0">
            <h1 class="display-4 fw-bold mb-4">Sonrisas Saludables para Toda la Familia</h1>
            <p class="fs-5 text-secondary mb-4">
              En Clínica Dental Dra. Diana Noriega nos dedicamos a brindar atención odontológica de calidad con
              tecnología avanzada y un equipo profesional comprometido con su salud bucal.
            </p>

            <div class="d-flex flex-column flex-sm-row gap-3">

              <div class="d-flex align-items-center">
                <?php if(isset($_SESSION['email'])):?>
                  <div class="d-flex align-items-center">
                  <a href="vista/agendarCita.html" class="btn btn-primary rounded-pill px-4 py-2">Agendar Cita</a>
                    <!-- <?php header("Location: vista/agendarCita.html")?> -->
                  </div>
                  <?php else:?>
                    <a class="nav-link" href="#" style="color: #000000;">
                  <button class="btn btn-primary"><span class="Entrar" data-bs-toggle="modal" data-bs-target="#inicio">Iniciar Sesión</span></button></a>
                  <!-- <a href="register.html" class="btn btn-primary rounded-pill px-4 py-2">Agendar Cita</a> -->
                    <?php endif; ?>
              </div>

              <!-- <a href="register.html" class="btn btn-primary rounded-pill px-4 py-2">Agendar Cita</a> -->
              <a href="#servicios" class="btn btn-outline-primary rounded-pill px-4 py-2">Nuestros Servicios</a>
            </div>
          </div>
          <div class="col-md-6 text-center">
            <img src="img/logo.png" alt="Clínica Dental" class="img-fluid rounded" style="max-height: 400px;">
          </div>
        </div>
      </div>
      <div class="wave-divider"></div>
    </section>
    </main>

    <!-- Services Section -->
    <section id="servicios" class="py-5">
      <div class="container">
        <div class="text-center mb-5">
          <h2 class="display-5 fw-bold mb-3">Nuestros Servicios</h2>
          <p class="text-secondary mx-auto" style="max-width: 700px;">
            Ofrecemos una amplia gama de servicios odontológicos para cuidar de su salud bucal y mantener su
            sonrisa radiante.
          </p>
        </div>

        <div class="row g-4">
          <!-- Service 1 -->
          <div class="col-md-6 col-lg-4">
            <div class="card h-100 shadow-sm hover-shadow">
              <div class="card-body text-center p-4">
                <div class="service-icon mx-auto mb-3">
                  <i class="bi bi-check-circle"></i>
                </div>
                <h3 class="card-title fs-4 fw-semibold">Limpieza Dental</h3>
                <p class="card-text text-secondary">
                  Eliminación profesional de placa y sarro para mantener sus dientes y encías saludables.
                </p>
              </div>
            </div>
          </div>

          <!-- Service 2 -->
          <div class="col-md-6 col-lg-4">
            <div class="card h-100 shadow-sm hover-shadow">
              <div class="card-body text-center p-4">
                <div class="service-icon mx-auto mb-3">
                  <i class="bi bi-lightning"></i>
                </div>
                <h3 class="card-title fs-4 fw-semibold">Blanqueamiento Dental</h3>
                <p class="card-text text-secondary">
                  Procedimientos efectivos para aclarar el color de sus dientes y mejorar su sonrisa.
                </p>
              </div>
            </div>
          </div>

          <!-- Service 3 -->
          <div class="col-md-6 col-lg-4">
            <div class="card h-100 shadow-sm hover-shadow">
              <div class="card-body text-center p-4">
                <div class="service-icon mx-auto mb-3">
                  <i class="bi bi-clipboard"></i>
                </div>
                <h3 class="card-title fs-4 fw-semibold">Ortodoncia</h3>
                <p class="card-text text-secondary">
                  Tratamientos para corregir la posición de los dientes y mejorar su mordida.
                </p>
              </div>
            </div>
          </div>

          <!-- Service 4 -->
          <div class="col-md-6 col-lg-4">
            <div class="card h-100 shadow-sm hover-shadow">
              <div class="card-body text-center p-4">
                <div class="service-icon mx-auto mb-3">
                  <i class="bi bi-heart"></i>
                </div>
                <h3 class="card-title fs-4 fw-semibold">Endodoncia</h3>
                <p class="card-text text-secondary">
                  Tratamiento de conducto para eliminar infecciones y salvar dientes dañados.
                </p>
              </div>
            </div>
          </div>

          <!-- Service 5 -->
          <div class="col-md-6 col-lg-4">
            <div class="card h-100 shadow-sm hover-shadow">
              <div class="card-body text-center p-4">
                <div class="service-icon mx-auto mb-3">
                  <i class="bi bi-sliders"></i>
                </div>
                <h3 class="card-title fs-4 fw-semibold">Implantes Dentales</h3>
                <p class="card-text text-secondary">
                  Soluciones permanentes para reemplazar dientes perdidos con resultados naturales.
                </p>
              </div>
            </div>
          </div>

          <!-- Service 6 -->
          <div class="col-md-6 col-lg-4">
            <div class="card h-100 shadow-sm hover-shadow">
              <div class="card-body text-center p-4">
                <div class="service-icon mx-auto mb-3">
                  <i class="bi bi-shield-check"></i>
                </div>
                <h3 class="card-title fs-4 fw-semibold">Odontología Preventiva</h3>
                <p class="card-text text-secondary">
                  Cuidados regulares para prevenir problemas dentales antes de que ocurran.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section id="nosotros" class="py-5 bg-light">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-6 mb-4 mb-md-0 text-center">
            <img src="img/logo.png" alt="Dra. Diana Noriega" class="img-fluid rounded" style="max-height: 400px;">
          </div>
          <div class="col-md-6">
            <h2 class="display-5 fw-bold mb-3">Sobre Nosotros</h2>
            <p class="text-secondary mb-3">
              En Clínica Dental Dra. Diana Noriega, nos dedicamos a proporcionar atención odontológica de la más
              alta calidad en un ambiente cómodo y acogedor. Nuestro equipo de profesionales altamente capacitados
              está comprometido con su salud bucal y bienestar general.
            </p>
            <p class="text-secondary mb-4">
              Utilizamos tecnología de vanguardia y técnicas modernas para ofrecer tratamientos efectivos y
              mínimamente invasivos. Nos enorgullece brindar una experiencia dental personalizada que se adapta a
              las necesidades únicas de cada paciente.
            </p>
            <div class="d-flex flex-column flex-sm-row gap-3">
              <a href="#" class="btn btn-primary rounded-pill px-4 py-2 d-flex align-items-center justify-content-center" data-bs-toggle="modal" data-bs-target="#inicio">
                <span>Iniciar Sesión</span>
                <i class="bi bi-chevron-right ms-2"></i>
              </a>
              <a href="#" class="btn btn-outline-primary rounded-pill px-4 py-2" data-bs-toggle="modal" data-bs-target="#registro">Registrarse</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <!-- <section id="contacto" class="py-5">
      <div class="container">
        <div class="text-center mb-5">
          <h2 class="display-5 fw-bold mb-3">Contáctenos</h2>
          <p class="text-secondary mx-auto" style="max-width: 700px;">
            Estamos aquí para responder a sus preguntas y programar su próxima cita. No dude en ponerse en
            contacto con nosotros.
          </p>
        </div>
        
      <div class="text-cente mb-4">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d986.9778083423166!2d-73.61163253044951!3d8.311619926501532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e5d855d14a809c1%3A0x292a6a190f9066fd!2sFinca%20Report.!5e0!3m2!1ses-419!2sco!4v1748724539536!5m2!1ses-419!2sco" width="400" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>

        <div class="row g-4">
          <div class="col-md-4">
            <div class="card h-100 shadow-sm hover-shadow text-center">
              <div class="card-body p-4">
                <div class="contact-icon mx-auto mb-3">
                  <i class="bi bi-telephone"></i>
                </div>
                <h3 class="card-title fs-4 fw-semibold">Teléfono</h3>
                <p class="card-text text-secondary mb-0">+57 123 456 7890</p>
                <p class="card-text text-secondary">+57 098 765 4321</p>
              </div>
            </div>
          </div>

          <div class="col-md-4">
            <div class="card h-100 shadow-sm hover-shadow text-center">
              <div class="card-body p-4">
                <div class="contact-icon mx-auto mb-3">
                  <i class="bi bi-geo-alt"></i>
                </div>
                <h3 class="card-title fs-4 fw-semibold">Dirección</h3>
                <p class="card-text text-secondary mb-0">Calle 123 #45-67</p>
                <p class="card-text text-secondary">Bogotá, Colombia</p>
              </div>
            </div>
          </div>

          <div class="col-md-4">
            <div class="card h-100 shadow-sm hover-shadow text-center">
              <div class="card-body p-4">
                <div class="contact-icon mx-auto mb-3">
                  <i class="bi bi-clock"></i>
                </div>
                <h3 class="card-title fs-4 fw-semibold">Horario</h3>
                <p class="card-text text-secondary mb-0">Lunes a Viernes: 8:00 AM - 6:00 PM</p>
                <p class="card-text text-secondary">Sábados: 9:00 AM - 1:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section> -->

    <section id="contacto" class="py-5">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-6 mb-4 mb-md-0">
        <div class="text-start">
          <h2 class="display-5 fw-bold mb-3">Contáctenos</h2>
          <p class="text-secondary mx-auto" style="max-width: 700px;">
            Estamos aquí para responder a sus preguntas y programar su próxima cita. No dude en ponerse en
            contacto con nosotros.
          </p>
        </div>
      </div>
      <div class="col-md-6">
          <iframe class="mapa-estatico" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d986.9778083423166!2d-73.61163253044951!3d8.311619926501532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e5d855d14a809c1%3A0x292a6a190f9066fd!2sFinca%20Report.!5e0!3m2!1ses-419!2sco!4v1748724539536!5m2!1ses-419!2sco" width="400" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
      </div>
      <br>

        <div class="row g-4">
          <div class="col-md-4">
            <div class="card h-100 shadow-sm hover-shadow text-center">
              <div class="card-body p-4">
                <div class="contact-icon mx-auto mb-3">
                  <i class="bi bi-telephone"></i>
                </div>
                <h3 class="card-title fs-4 fw-semibold">Teléfono</h3>
                <p class="card-text text-secondary mb-0">+57 123 456 7890</p>
                <p class="card-text text-secondary">+57 098 765 4321</p>
                <!-- <a href="https://wa.me/573001234567?text=Hola%20me%20gustaría%20agendar%20una%20cita" target="_blank">
                    Contáctanos por WhatsApp
                </a> -->
              </div>
            </div>
          </div>

          <div class="col-md-4">
            <div class="card h-100 shadow-sm hover-shadow text-center">
              <div class="card-body p-4">
                <div class="contact-icon mx-auto mb-3">
                  <i class="bi bi-geo-alt"></i>
                </div>
                <h3 class="card-title fs-4 fw-semibold">Dirección</h3>
                <p class="card-text text-secondary mb-0">Calle 24 #3-05</p>
                <p class="card-text text-secondary">Aguachica-Cesar, Colombia</p>
              </div>
            </div>
          </div>

          <div class="col-md-4">
            <div class="card h-100 shadow-sm hover-shadow text-center">
              <div class="card-body p-4">
                <div class="contact-icon mx-auto mb-3">
                  <i class="bi bi-clock"></i>
                </div>
                <h3 class="card-title fs-4 fw-semibold">Horarios de atencion</h3>
                <p class="card-text text-secondary mb-0">Lunes a Sabado: 8:00 AM - 12:00 PM <br> 2:00 PM - 5:00 PM</p>
                <!-- <p class="card-text text-secondary mb-0">Lunes a Viernes: 8:00 AM - 12:00 PM | 2:00 PM - 5:00 PM</p> -->
                <!-- <p class="card-text text-secondary">Sábados: 8:00 AM - 12:00 PM | 2:00 PM - 5:00 PM</p> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- CTA Section -->
    <section class="py-5 bg-primary text-white">
      <div class="container text-center">
        <h2 class="display-5 fw-bold mb-3">¿Listo para una sonrisa más saludable?</h2>
        <p class="mx-auto mb-4" style="max-width: 700px; opacity: 0.9;">
          Agende su cita hoy mismo y dé el primer paso hacia una mejor salud bucal. Nuestro equipo está listo para
          atenderle con el mejor cuidado dental.
        </p>
        <div class="d-flex flex-column flex-sm-row gap-3 justify-content-center">
          <a href="#" class="btn btn-light text-primary rounded-pill px-4 py-2" data-bs-toggle="modal" data-bs-target="#registro">Registrarse</a>
          <a href="#" class="btn btn-outline-light rounded-pill px-4 py-2" data-bs-toggle="modal" data-bs-target="#inicio">Iniciar Sesión</a>
        </div>
      </div>
    </section>
  </main>

    <div class="container-fluid">

        <div class="inicioSesion">
            <!-- Inicio ventana modal inicio de sesion -->    
                  <!-- The Modal -->
                  <div class="modal fade" id="inicio" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                      <div class="modal-content">
                        <button type="button" class="btn border-0 bg-transparent position-absolute start-0 top-0 p-3" data-bs-dismiss="modal" aria-label="Cerrar">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="chevron-left">
                            <path d="m15 18-6-6 6-6" style="color: #000000;" />
                          </svg>
                        </button>
                        <div class="modal-body">
                            <div class="logo_circle">
                                <img src="img/logo.png" alt="Logo">
                            </div>

                            <h4 class="fw-bold mb-3">Inicio de sesión</h4>
                            <p>Inicia sesión con tu usuario de <strong>Consultorio Diana</strong></p>

                            <!-- <form action="controlador/inicioSesion_Controlador.php" method="post">
                                <div class="mb-3 text-start">
                                    <label for="email" class="form-label">Correo electrónico</label>
                                    <input type="email" class="form-control" name="email" id="email" placeholder="correoElectronico@gmail.com"  required>
                                </div>
                                <div class="mb-3 text-start">
                                    <label for="password" class="form-label">Password</label>
                                    <input type="password" class="form-control" name="password" id="password" placeholder="Ingrese su contraseña" required>
                                </div>

                                <div class="forgot-password mb-3 text-end">
                                    <a href="#" data-bs-toggle="modal" data-bs-target="#recuperarContraseña">¿Se le olvido la contraseña?</a>
                                </div>

                                <button type="submit" class="btn btn-primary">Inicio de sesión</button>

                            </form> -->
                            <form id="formLogin" action="controlador/inicioSesion_Controlador.php" method="post">
                                <div class="mb-3 text-start">
                                    <label for="email" class="form-label">Correo electrónico</label>
                                    <input type="email" class="form-control" name="email" id="email" placeholder="correoElectronico@gmail.com"  required>
                                </div>
                                <div class="mb-3 text-start">
                                    <label for="password" class="form-label">Password</label>
                                    <input type="password" class="form-control" name="password" id="password" placeholder="Ingrese su contraseña" required>
                                </div>

                                <div class="forgot-password mb-3 text-end">
                                    <a href="#" data-bs-toggle="modal" data-bs-target="#recuperarContraseña">¿Se le olvido la contraseña?</a>
                                </div>

                                <button type="submit" class="btn btn-primary">Inicio de sesión</button>

                            </form>
                            
                            <div class="register-link mt-3">
                                ¿No tienes cuenta? <a href="#" data-bs-toggle="modal" data-bs-target="#registro">REGÍSTRATE</a>
                            </div>
                            <!-- <button type="button" class="btn-close" data-bs-dismiss="modal"></button> -->
                        </div>    
                    </div>
                    </div>
                </div>
                    <!-- Fin ventana modal inicio de sesion-->
        </div>
        <!-- Inicio ventana modal Recuperar contraseña -->
        <div class="modal fade" id="recuperarContraseña" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centeted">
            <div class="modal-content">
              <button type="button" class="btn border-0 bg-transparent position-absolute start-0 top-0 p-3" data-bs-dismiss="modal" aria-label="Cerrar">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="chevron-left">
                  <path d="m15 18-6-6 6-6" style="color: #000000;" />
                </svg>
              </button>
              <div class="modal-body">
                  <div class="logo_circle">
                      <img src="img/logo.png" alt="Logo">
                  </div>

                  <h4 class="fw-bold mb-3">Recuperar contraseña</h4>
                  <p>Ingresa su correo electrónico para recibir instrucciones de recuperación</p>

                  <!-- <form action="controlador/recuperarPassword_Controlador.php" method="post">
                      <div class="mb-3 text-start">
                          <label for="email" class="form-label">Correo electrónico</label>
                          <input type="email" class="form-control" name="email" id="email" placeholder="correoElectronico@gmail.com"  required>
                      </div>
                      <button type="submit" class="btn btn-primary">Enviar</button>
                  </form> -->
                  <form id="formRecuperar" action="controlador/recuperarPassword_Controlador.php" method="post">
                      <div class="mb-3 text-start">
                          <label for="email" class="form-label">Correo electrónico</label>
                          <input type="email" class="form-control" name="email" id="email" placeholder="correoElectronico@gmail.com"  required>
                      </div>
                      <button type="submit" class="btn btn-primary">Enviar</button>
                  </form>
                  
                  <div class="register-link mt-3">
                      <a href="#" data-bs-toggle="modal" data-bs-target="#inicio">Volver al Inicio de sesión</a>
                  </div>
                  <!-- <button type="button" class="btn-close" data-bs-dismiss="modal"></button> -->
              </div>    
          </div>
          </div>
      </div>

      <!-- Inicio ventana modal Registro -->    
                  <!-- The Modal -->
                  <div class="modal fade" id="registro" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centeted">
                      <div class="modal-content">
    
                        <button type="button" class="btn border-0 bg-transparent position-absolute star-0 top-0 p-3" data-bs-dismiss="modal" aria-label="Cerrar">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="chevron-left">
                            <path d="m15 18-6-6 6-6" style="color: #000000;" />
                          </svg>
                        </button>
                        <div class="modal-body">
                            <div class="logo_circle">
                                <img src="img/logo.png" alt="Logo">
                            </div>

                            <h4 class="fw-bold mb-3">Registro</h4>
                            <p>Crea tu cuenta llenando estos datos</p>

                            <!-- <form action="controlador/paciente_Controlador.php" method="post">
                                <div class="mb-3 text-start">
                                    <label for="nombre" class="form-label">Nombre</label>
                                    <input type="text" class="form-control" name="nombre" id="nombre" placeholder="Ingrese tu nombre"  required>
                                </div>
                                <div class="mb-3 text-start">
                                    <label for="apellidos" class="form-label">Apellidos</label>
                                    <input type="text" class="form-control" name="apellidos" id="apellidos" placeholder="Ingrese sus apellidos" required>
                                </div>
                                <div class="mb-3 text-start">
                                  <label for="cedula" class="form-label">Cedula</label>
                                  <input type="number" class="form-control" name="cedula" id="cedula" maxlength="10" placeholder="Ingrese su cedula"  required>
                              </div>
                              <div class="mb-3 text-start">
                                  <label for="email" class="form-label">Email</label>
                                  <input type="email" class="form-control" name="email" id="email" placeholder="correoElectronico@gmail.com" required>
                              </div>
                              <div class="mb-3 text-start">
                                <label for="sexo" class="form-label">Sexo</label>
                                <select name="sexo" id="sexo"class= "form-control" require>
                                    <option value="" disabled selected></option>
                                    <option value="opcion1">Masculino</option>
                                    <option value="opcion2">Femenino</option>
                                </select>
                            </div>
                            <div class="mb-3 text-start">
                                <label for="telefono" class="form-label">Teléfono</label>
                                <input type="number" class="form-control" name="telefono" id="telefono" maxlength="10" placeholder="Ingrese su teléfono" required>
                            </div>
                            <div class="mb-3 text-start">
                                <label for="edad" class="form-label">Edad</label>
                                <input type="datetime-local" class="form-control" name="date" id="date"  placeholder="Ingrese su fecha" required>
                            </div>
                            <div class="mb-3 text-start">
                              <label for="password" class="form-label">Password</label>
                              <input type="password" class="form-control" name="password" id="password" placeholder="Ingrese su contraseña" required>
                          </div>
                                <button type="submit" class="btn btn-primary">Crear Cuenta</button>

                            </form> -->
                            <form id="formRegistro" action="controlador/paciente_Controlador.php" method="post">
                                <div class="mb-3 text-start">
                                    <label for="nombre" class="form-label">Nombre</label>
                                    <input type="text" class="form-control" name="nombre" id="nombre" placeholder="Ingrese tu nombre"  required>
                                </div>
                                <div class="mb-3 text-start">
                                    <label for="apellidos" class="form-label">Apellidos</label>
                                    <input type="text" class="form-control" name="apellidos" id="apellidos" placeholder="Ingrese sus apellidos" required>
                                </div>
                                <div class="mb-3 text-start">
                                  <label for="cedula" class="form-label">Cedula</label>
                                  <input type="number" class="form-control" name="cedula" id="cedula" maxlength="10" placeholder="Ingrese su cedula"  required>
                              </div>
                              <div class="mb-3 text-start">
                                  <label for="email" class="form-label">Email</label>
                                  <input type="email" class="form-control" name="email" id="email" placeholder="correoElectronico@gmail.com" required>
                              </div>
                              <div class="mb-3 text-start">
                                <label for="sexo" class="form-label">Sexo</label>
                                <!-- <input type="text" class="form-control" name="sexo" id="sexo" placeholder="Ingrese su genero"  required> -->
                                <select name="sexo" id="sexo"class= "form-control" require>
                                    <option value="" disabled selected></option>
                                    <option value="opcion1">Masculino</option>
                                    <option value="opcion2">Femenino</option>
                                </select>
                            </div>
                            <div class="mb-3 text-start">
                                <label for="telefono" class="form-label">Teléfono</label>
                                <input type="number" class="form-control" name="telefono" id="telefono" maxlength="10" placeholder="Ingrese su teléfono" required>
                            </div>
                            <div class="mb-3 text-start">
                                <label for="edad" class="form-label">Edad</label>
                                <input type="datetime-local" class="form-control" name="date" id="date"  placeholder="Ingrese su fecha" required>
                            </div>
                            <div class="mb-3 text-start">
                              <label for="password" class="form-label">Password</label>
                              <input type="password" class="form-control" name="password" id="password" placeholder="Ingrese su contraseña" required>
                          </div>
                                <button type="submit" class="btn btn-primary">Crear Cuenta</button>

                            </form>
                            
                            <div class="register-link mt-3">
                                ¿Ya tienes cuenta? <a href="#" data-bs-toggle="modal" data-bs-target="#inicio">Inicia sesión</a>
                            </div>
                            <!-- <button type="button" class="btn-close" data-bs-dismiss="modal"></button> -->
                        </div>    
                    </div>
                    </div>
                </div>
                    <!-- Fin ventana modal inicio de sesion-->



    </div>

    <!-- Footer -->
  <!-- <footer class="bg-dark text-white py-4">
    <div class="container">
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-center">
        <div class="d-flex align-items-center mb-3 mb-md-0">
          <div class="logo-container me-2">
            <img src="img/logo.png" alt="Dra. Diana Noriega Logo" class="img-fluid">
          </div>
          <span class="fs-4 fw-bold">Clínica Dental</span>
        </div>


        <div class="mb-2">
          <p class="mb-0">&copy; <script>document.write(new Date().getFullYear())</script> Clínica Dental Dra. Diana Noriega. Todos los derechos reservados.</p>
        </div>

      <div class="redes mt-2">
        <a href="https://www.instagram.com/dra.diananoriega" target="_blank" class="d-flex align-items-center text-decoration-none">
          <i class="bi bi-instagram me-2 instagram-icon"></i>
          <span class="text-white fw-semibold">Instagram</span>
        </a>
      </div>
      </div>
    </div>
  </footer> -->
  <!-- Footer -->
<footer class="bg-dark text-white py-4">
  <div class="container">
    <div class="d-flex flex-column align-items-center text-center">

      <!-- Logo y nombre -->
      <div class="d-flex align-items-center mb-3">
        <div class="logo-container me-2">
          <img src="img/logo.png" alt="Dra. Diana Noriega Logo" class="img-fluid" style="max-height: 50px;">
        </div>
        <span class="fs-4 fw-bold">Clínica Dental</span>
      </div>

      <!-- Derechos -->
      <p class="mb-2">
        &copy; <script>document.write(new Date().getFullYear())</script> Clínica Dental Dra. Diana Noriega. Todos los derechos reservados.
      </p>

      <!-- Redes sociales debajo -->
      <div class="redes mt-2">
        <a href="https://www.instagram.com/dra.diananoriega" target="_blank" class="d-flex align-items-center justify-content-center text-decoration-none">
          <i class="bi bi-instagram me-2 instagram-icon"></i>
          <span class="text-white fw-semibold">Instagram</span>
        </a>
      </div>

    </div>
  </div>
</footer>



<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
<script src="js/indexValidaciones.js"></script>
</body>
</html>
