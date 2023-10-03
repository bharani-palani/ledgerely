<!DOCTYPE html>
<html lang="en">

<head>
	<style type="text/css">
		body {
			background-color: #ffffff;
			margin: 0 20px;
			color: <?php echo $globalConfig[0]['webThemeColor']; ?>;
			font: 15px/19px normal Helvetica, Arial, sans-serif;
		}

		.container {
			word-wrap: break-word;
			margin: 10px;
			box-shadow: 0 2px 15px rgba(0, 0, 0, 0.5);
			border-radius: 10px;
			text-overflow: auto;
		}

		.content {
			padding: 10px;
		}

		.header {
			border-top-left-radius: 10px;
			border-top-right-radius: 10px;
			background-color: <?php echo $globalConfig[0]['webThemeBackground']; ?>;
			border-bottom: 1px solid #D0D0D0;
			padding: 20px 0;
			font-size: 25px;
			text-align: center;
		}

		.footer {
			text-align: right;
			font-size: 14px;
			border-top: 1px solid #D0D0D0;
			padding: 20px 0;
			text-align: center;
			border-bottom-left-radius: 10px;
			border-bottom-right-radius: 10px;
			color: <?php echo $globalConfig[0]['webThemeBackground']; ?>;
			background-color: <?php echo $globalConfig[0]['webThemeColor']; ?>;
		}

		.footer a {
			color: <?php echo $globalConfig[0]['webThemeBackground']; ?>;
		}

		.flex {
			display: flex;
			align-items: center;
		}

		.justifyCenter {
			justify-content: center;
		}

		.pr-10 {
			padding-right: 10px;
		}
	</style>
</head>

<body>

	<div class="container">
		<header class="header">
			<div class="flex justifyCenter">
				<div class="pr-10"><img width="30" height="30" src="<?php echo base_url() . 'api/media/render?X-Access-Key=' . $globalConfig[0]['fileStorageAccessKey'] . '&fileURL=/logo/ICO/blackBg/32x32.png' ?>" /></div>
				<div><?php echo $appName; ?></div>
			</div>
		</header>
		<section class="content">
			<p><?php echo $saluation; ?></p>
			<?php foreach ($matter as $value) { ?>
				<p><?php echo $value; ?></p>
			<?php } ?>
			<p>
			<div><?php echo $signature; ?></div>
			<em><?php echo $signatureCompany; ?></em>
			</p>
		</section>
		<footer class="footer"><?php echo $disclaimer; ?></footer>
	</div>

</body>

</html>