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
			padding: 10px 0;
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

		.footer * {
			color: <?php echo $globalConfig[0]['webThemeBackground']; ?>;
		}

		.tableCenter {
			font-size: 25px;
			margin-left: auto;
			margin-right: auto;
		}

		.imageAlign {
			padding-right: 10px;
		}

		.textRight {
			text-align: right;
		}

		.textCenter {
			text-align: center;
		}

		.verticalMiddle {
			vertical-align: middle;
		}
	</style>
</head>

<body>

	<div class="container">
		<header class="header">
			<table class="tableCenter">
				<tr>
					<td class="imageAlign"><img width="40" height="40" class="verticalMiddle" src="<?php echo base_url() . 'api/media/render?X-Access-Key=' . $globalConfig[0]['fileStorageAccessKey'] . '&fileURL=/logo/ICO/blackBg/32x32.png' ?>" /></td>
					<td><span class="verticalMiddle"><?php echo $appName; ?></span></td>
				</tr>
			</table>
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
		<footer class="footer">
			<table class="textCenter" width="100%">
				<tr>
					<td class="textCenter" style="width:33.33%;">&copy; All rights reserved</td>
					<td class="textCenter" style="width:33.33%;"><?php echo $globalConfig[0]['appSupportEmail']; ?></td>
					<td class="textCenter" style="width:33.33%;"><?php echo $globalConfig[0]['appWeb']; ?></td>
				</tr>
			</table>
		</footer>
	</div>

</body>

</html>