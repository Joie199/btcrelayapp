<?php include 'config.php'; ?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Multi-Vendor Bitcoin E-commerce</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>

<body class="bg-gray-100 min-h-screen flex">
  <!-- Sidebar Menu -->
  <?php include 'sidebar.php'; ?>

  <!-- Main Content -->
  <main class="flex-1 p-6">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-center mb-8">Multi-Vendor Bitcoin E-commerce</h1>

      <!-- Register Section -->
      <div id="register" class="bg-white p-6 rounded shadow mb-8">
        <h2 class="text-xl font-semibold mb-4">Login</h2>
        For --Testing-- 
        <span>(testuser@test.com).(testuser)</span>
         <br>
          <span>(testvendor@test.com).(testvendor)</span>

        <?php
        if (isset($_GET['RID'])) {
        ?>
          <div class="flex items-center justify-between p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg shadow" role="alert" id="user-created-alert">
            <div class="flex items-center space-x-2">
              <svg class="w-5 h-5 text-green-700" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span>Welcome <?php echo $suser_name; ?>.</span>
            </div>
            <button type="button" class="text-green-700 hover:text-green-900 focus:outline-none" onclick="document.getElementById('user-created-alert').remove();">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <?php
        }
        if (isset($_POST['login'])) {


          print_r($_POST);

          $emailserver = $_POST['emailform'];
          $passserver = $_POST['passform'];
          $emailserver = stripslashes($emailserver);
          $passserver = stripslashes($passserver);
          $emailserver = mysqli_real_escape_string($link, $emailserver);
          $passserver = mysqli_real_escape_string($link, $passserver);
          $role = $_POST['role'];
          //$passserver = md5($passserver);


          $sql = mysqli_query($link, "SELECT count(*) as checkcount FROM `members` WHERE `M_name` = '$emailserver' and `M_password` = '$passserver' and `M_type` = '$role'  ") or die(mysqli_error());

          // If result matched $username and $password.
          $countarray = mysqli_fetch_array($sql);
          $count = $countarray['checkcount'];

          if ($count > 0) {
            $_SESSION['suser_name'] = $emailserver;
            $_SESSION['utype'] = $role;



            mysqli_query($link, "UPDATE `members` SET `M_last_login`= NOW()  WHERE `M_name` = '$emailserver' and `M_password` = '$passserver'") or die(mysqli_error());
            header("location:login.php?RID");
          } else {
          ?>
            <div class="flex items-center justify-between p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg shadow" role="alert" id="user-created-alert">
              <div class="flex items-center space-x-2">
                <svg class="w-5 h-5 text-red-700" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>Wrong Credentials .</span>
              </div>
              <button type="button" class="text-green-700 hover:text-green-900 focus:outline-none" onclick="document.getElementById('user-created-alert').remove();">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

        <?php


          }
        }

        ?>
        <form method="POST" action="login.php" class="grid gap-4">
          <select name="role" class="p-2 border rounded">
            <option value="user">User</option>
            <option value="vendor">Vendor</option>
          </select>
          <input name="emailform" type="email" name="email" placeholder="Email" class="p-2 border rounded">
          <input name="passform" type="password" name="password" placeholder="Password" class="p-2 border rounded">
          <button name="login" type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Register</button>
        </form>
      </div>

      <!-- Vendor Dashboard -->

    </div>
  </main>
</body>

</html>