<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inicio</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="stylesheet" href="css/styleIndex.css">
</head>
<body>
    <header class="cabeza">
        <!-- Inicio del navbar -->
    <nav class="navbar navbar-expand-lg navbar-gradient">
        <div class="container-fluid">
          <a class="navbar-brand" href="#" style="color: #000000;"><img src="img/logo.png" width="20%" alt="Error"></a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#" style="color: #000000;">Inicio</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" style="color: #000000;">Horarios</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" style="color: #000000;">Servicios</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" style="color: #000000;">Agendamiento de citas</a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" style="color: #000000;">
                  Sobre nosotros
                </a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#" style="color: #000000">Misión</a></li>
                  <li><a class="dropdown-item" href="#" style="color: #000000;">Visión</a></li>
                  <li><hr class="dropdown-divider"></li>
                </ul>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" style="color: #000000;">Inicio de sesión</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" style="color: #000000;"><button class="buttonEntrar"><span class="Entrar">Entrar</span></button></a>
              </li>
              <!-- <li class="nav-item">
                <a class="nav-link disabled" aria-disabled="true" style="color: #000000;">Disabled</a>
              </li>-->
            </ul> 
            
          </div>
        </div>
      </nav>
      <!-- Fin del navbar -->
    </header>

    <div class="container-fluid">

    </div>

    <footer class="borde"></footer>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>

<div class="inicioSesion"></div>
<!-- Botón para abrir el modal -->
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#loginModal">
  Iniciar Sesión
</button>

<!-- Modal -->
<div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="loginModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">

      <form action="procesar_login.php" method="POST"> <!-- Aquí haces el POST -->
        <div class="modal-header">
          <h5 class="modal-title" id="loginModalLabel">Iniciar Sesión</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Cerrar">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div class="modal-body">
            <div class="form-group">
                <label for="usuario">Usuario</label>
                <input type="text" class="form-control" name="usuario" id="usuario" required>
            </div>

            <div class="form-group">
                <label for="clave">Contraseña</label>
                <input type="password" class="form-control" name="clave" id="clave" required>
            </div>
        </div>

        <div class="modal-footer">
          <button type="submit" class="btn btn-primary">Entrar</button>
        </div>
      </form>

    </div>
  </div>
</div>
</body>
</html>

<!-- php -->
<?php 

    echo "Hola mundo\n";
    echo "Como estan todos";
?>
