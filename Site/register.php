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
        <h2 class="text-xl font-semibold mb-4">Register</h2>
        <form method="POST" action="register.php" class="grid gap-4">
          <select name="role" class="p-2 border rounded">
            <option value="user">User</option>
            <option value="vendor">Vendor</option>
          </select>
          <input type="email" name="email" placeholder="Email" class="p-2 border rounded">
          <input type="password" name="password" placeholder="Password" class="p-2 border rounded">
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Register</button>
        </form>
      </div>

      <!-- Vendor Dashboard -->

    </div>
  </main>
</body>
</html>
