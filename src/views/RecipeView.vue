<template>
    <!--main-->
	<main class="main" role="main">
		<!--wrap-->
		<div class="wrap clearfix">
			<!--breadcrumbs-->
			<nav class="breadcrumbs">
				<ul>
					<li><router-link to="/">Home</router-link></li>
					<li><router-link to="/Recipes">Recipes</router-link></li>
					<li><router-link to="/Recipes">Deserts</router-link></li>
					<li>Recipe</li>
				</ul>
			</nav>
			<!--//breadcrumbs-->
			
			<!--row-->
			<div class="row">
				<header class="s-title">
					<h1>Recipe title example</h1>
				</header>
				<!--content-->
				<section class="content three-fourth">
					<!--recipe-->
						<div class="recipe">
							<div class="row">
								<!--two-third-->
								<article class="two-third">
									<div class="image"><a href="#"><img src="../frontend/images/img.jpg" alt="" /></a></div>
									<div class="intro"><p><strong>Recipe Description :</strong></p> 
									<p>The description of the Recipe will be here.</p></div>
									<div class="instructions">
										<ol>
											<li>Step 1.</li>
											<li>Step 2.</li>
											<li>Step 3.</li>
											<li>Step 4.</li>
										</ol>
									</div>
								</article>
								<!--//two-third-->
								
								<!--one-third-->
								<article class="one-third">
									<dl class="basic">
										<dt>Preparation time</dt>
										<dd>15 mins</dd>
										<dt>Cooking time</dt>
										<dd>30 mins</dd>
										<dt>Difficulty</dt>
										<dd>easy</dd>
										<dt>Serves</dt>
										<dd>4 people</dd>
									</dl>
									
									<dl class="user">
										<dt>Category</dt>
										<dd>Deserts</dd>
										<dt>Posted by</dt>
										<dd>Oussama I.</dd>
									</dl>
									
									<dl class="ingredients">
										<dt>300g</dt>
										<dd>ingredient</dd>
										<dt>200g</dt>
										<dd>ingredient</dd>
										<dt>200g</dt>
										<dd>ingredient</dd>
										<dt>2</dt>
										<dd>ingredient</dd>
										<dt>1 tbsp</dt>
										<dd>ingredient</dd>
										<dt>200 g</dt>
										<dd>ingredient</dd>
										<dt>100 ml</dt>
										<dd>ingredient</dd>
										<dt>5</dt>
										<dd>ingredient</dd>
									</dl>
								</article>
								<!--//one-third-->
							</div>
						</div>
						<!--//recipe-->
							
						<!--comments-->
						<div class="comments" id="comments">
							<h2>2 comments </h2>
							<ol class="comment-list">								
								<!--comment-->
								<li class="comment depth-1">
									<div class="avatar"><a href="#"><img src="../frontend/images/avatar1.jpg" alt="" /></a></div>
									<div class="comment-box">
										<div class="comment-author meta"> 
											<strong>Oussama I.</strong> said 2 days ago <a href="#" class="comment-reply-link"> Reply</a>
										</div>
										<div class="comment-text">
											<p>This is an example of comments.</p>
										</div>
									</div> 
								</li>
								<!--//comment-->
								
								<!--comment-->
								<li class="comment depth-2">
									<div class="avatar"><a href="#"><img src="../frontend/images/avatar1.jpg" alt="" /></a></div>
									<div class="comment-box">
										<div class="comment-author meta"> 
											<strong>Oussama I.</strong> said 1 day ago <a href="#" class="comment-reply-link"> Reply</a>
										</div>
										<div class="comment-text">
											<p>This is a reply example.</p>
										</div>
									</div> 
								</li>
								<!--//comment-->								
							
							</ol>
						</div>
						<!--//comments-->
						
						<!--respond-->
						<div class="comment-respond" id="respond">
							<h2>Leave a reply</h2>
							<div class="container">
								<p><strong>Note:</strong> Comments will be available only for registred members</p>
								<form>
									<div class="f-row">
										<textarea></textarea>
										<span class="req">*</span>
									</div>
									
									<div class="f-row">
										<div class="third bwrap">
											<input type="submit" value="Submit comment" />
										</div>
									</div>
									
								</form>
							</div>
						</div>
						<!--//respond-->
				</section>
				<!--//content-->
				
				<!--right sidebar-->
				<aside class="sidebar one-fourth">
					
					<div class="widget share">
						<ul class="boxed">
							<li class="light"><a href="#" title="Facebook"><i class="fa fa-facebook"></i> <span>Share on Facebook</span></a></li>
							<li class="medium"><a href="#" title="Twitter"><i class="fa fa-twitter"></i> <span>Share on Twitter</span></a></li>
							<li class="dark"><a href="#" title="Favourites"><i class="fa fa-heart"></i> <span>Add to Favourites</span></a></li>
						</ul>
					</div>
					
					
				</aside>
				<!--//right sidebar-->
			</div>
			<!--//row-->
		</div>
		<!--//wrap-->
	</main>
	<!--//main-->
</template>