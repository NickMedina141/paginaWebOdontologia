<?php
session_start();
session_destroy();
  header("Location: ../index2.php?Adios");
