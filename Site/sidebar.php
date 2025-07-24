<aside class="w-64 bg-white shadow-lg min-h-screen p-6 space-y-6">
  <h2 class="text-2xl font-bold text-blue-600"><?php echo $displayedname . "<br>" . $stype; ?></h2>
  <nav class="flex flex-col space-y-4">
    <a href="index.php" class="text-gray-700 hover:text-blue-500 font-medium">🏠 Home</a>
    <?php if ($displayedname == "Guest") { ?>
      <a href="register.php" class="text-gray-700 hover:text-blue-500 font-medium">🏠 Sign up with us</a>
      <a href="login.php" class="text-gray-700 hover:text-blue-500 font-medium">🏠 Sign in</a>
    <?php } ?>

    <?php if ($stype == "vendor") {

    ?>
      <a href="itemadd.php" class="text-gray-700 hover:text-blue-500 font-medium">📝 Add Products</a>
      <a href="mytranctions.php" class="text-gray-700 hover:text-blue-500 font-medium">📦 list of my Tranactions</a>
      <a href="mywallet.php" class="text-gray-700 hover:text-blue-500 font-medium">⚙️ my wallet</a>
      <a href="listofproducts.php" class="text-gray-700 hover:text-blue-500 font-medium">🛒 List of Your products</a>

    <?php } ?>
    <?php if ($stype != "Guest") { ?>

      <a href="profile.php" class="text-gray-700 hover:text-blue-500 font-medium">⚙️ Profile </a>
    <?php } ?>
    <?php if ($stype != "vendor") { ?>
      <a href="shop.php" class="text-gray-700 hover:text-blue-500 font-medium">🛒 Shop with Us</a>
    <?php } ?>
    <a href="#" class="text-gray-700 hover:text-blue-500 font-medium">⚙️ more to come (soon)</a>
    <a href="logout.php" class="text-gray-700 hover:text-blue-500 font-medium">⚙️ Logout</a>
  </nav>
</aside>