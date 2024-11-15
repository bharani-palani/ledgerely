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
			/* background-color: <?php echo $globalConfig[0]['webThemeBackground']; ?>; */
			border-bottom: 1px solid #eeeeee;
			padding: 3px 0;
		}

		.footer {
			text-align: right;
			padding: 10px 0;
			text-align: center;
			border-bottom-left-radius: 10px;
			border-bottom-right-radius: 10px;
			border-top: 1px solid #eeeeee;
		}

		.footer * {
			color: #0d6efd !important;
			font-size: .79rem;
			text-decoration: none;
		}

		.tableCenter {
			width: 100%;
		}

		.imageAlign {
			padding: 10px 5px 10px 10px;
		}

		.iconAlign {
			padding-right: 5px;
		}

		.textRight {
			text-align: right;
		}

		.textCenter {
			text-align: center;
		}
	</style>
</head>

<body>

	<div class="container">
		<header class="header">
			<table class="tableCenter">
				<tr>
					<td class="imageAlign">
						<a href="<?php echo $globalConfig[0]['appWeb'] ?>"><img height="30" src="<?php echo base_url() . 'api/media/render?X-Access-Key=' . $globalConfig[0]['fileStorageAccessKey'] . '&fileURL=/logo/PNG/greenBanner.png' ?>" /></a>
					</td>
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
					<td style="width:5%;">
						<a href="<?php echo $globalConfig[0]['appWeb'] ?>">
							<img height="30" width="30" src="<?php echo base_url() . 'api/media/render?X-Access-Key=' . $globalConfig[0]['fileStorageAccessKey'] . '&fileURL=/logo/PNG/greenIconNoBackground.png' ?>" />
						</a>
					</td>
					<td class="textCenter" style="width:40%;">
						<a href="mailto:<?php echo $globalConfig[0]['appSupportEmail']; ?>"><?php echo $globalConfig[0]['appSupportEmail']; ?></a>
					</td>
					<td class="textCenter" style="width:40%;">
						<a target="_blank" href="<?php echo $globalConfig[0]['appWeb']; ?>"><?php echo $globalConfig[0]['appWeb']; ?></a>
					</td>
				</tr>
			</table>
		</footer>
	</div>

</body>

</html>