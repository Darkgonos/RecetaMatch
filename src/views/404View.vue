<template>

<!--main-->
	<main class="main" role="main">
		<!--wrap-->
		<div class="wrap clearfix">
			<!--row-->
			<div class="row">
				<!--content-->
				<section class="content three-fourth">
					<!--row-->
					<div class="row">
						<div class="one-third">
							<div class="error-container">
								<span class="error_type">404</span>
								<span class="error_text">Page not found</span>
							</div>
						</div>
						
						<div class="two-third">
							<div class="container">
								<p>The page you’ve requested could not be found. </p>
								<p>If you believe that this is an error, please kindly <router-link to="/Contact">contact us</router-link>. Thank you!</p>
								<p>You can go <router-link to="/">back home</router-link> or try using the search. </p>
							</div>
						</div>
					</div>
					<!--//row-->
				</section>
				<!--//content-->
				
				<!--sidebar-->
				<aside class="sidebar one-fourth">
					<div class="widget">
						<h3>Search</h3>
						<div class="f-row">
							<input type="search" placeholder="Enter your search term" />
						</div>
						<div class="f-row">
							<input type="submit" value="Search" />
						</div>
					</div>
				</aside>
				<!--//sidebar-->
			</div>
			<!--//row-->
		</div>
		<!--//wrap-->
	</main>
	<!--//main-->


</template>

<script>

</script>