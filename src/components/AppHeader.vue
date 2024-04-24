<template>
  <header>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta
      name="keywords"
      content="RecetaMatch - Personalized Culinary Recipes Platform"
    />
    <meta
      name="description"
      content="RecetaMatch - Personalized Culinary Recipes Platform"
    />
    <meta name="author" content="Oussama Ibn Rass" />
    <title>RecetaMatch - {{ $route.name }}</title>
    <link
      href="https://fonts.googleapis.com/css?family=Raleway:400,300,500,600,700,800"
      rel="stylesheet"
    />
    <link rel="icon" type="image/x-icon" href="../frontend/images/favicon.ico" />
  </header>
  
</template>

<script>
import '../frontend/css/icons.css';
import '../frontend/css/style.css';


export default {
  name: 'AppHeader',
};
</script>