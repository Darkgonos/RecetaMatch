<template>

<!--main-->
	<main class="main" role="main">
		<!--wrap-->
		<div class="wrap clearfix">
			<!--row-->
			<div class="row">
			<!--content-->
				<section class="content center full-width">
					<div class="modal container">
						<h3>Login</h3>
						<div class="f-row">
							<input type="text" placeholder="Your username" />
						</div>
                        
						<div class="f-row">
							<input type="password" placeholder="Your password" />
						</div>
						
						<div class="f-row bwrap">
							<input type="submit" value="login" />
						</div>
						<p>Dont have an account yet? <router-link to="/Sign_up">Sign up.</router-link></p>
					</div>
				</section>
				<!--//content-->
			</div>
			<!--//row-->
		</div>
		<!--//wrap-->
	</main>
	<!--//main-->
	

</template>

<script>

</script>