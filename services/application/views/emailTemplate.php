<!DOCTYPE html>
<html lang="en">

<head>
	<style type="text/css">
		body {
			background-color: #ffffff;
			margin: 10px;
			color: <?php echo $globalConfig[0]['webThemeColor']; ?>;
			font: 15px/19px normal Helvetica, Arial, sans-serif;
		}

		.container {
			word-wrap: break-word;
			box-shadow: 0 2px 15px rgba(0, 0, 0, 0.5);
			border-radius: 10px;
			border: 1px solid #e0e0e0;
			width: 99%;
		}

		.content {
			padding: 10px;
		}

		.header {
			border-top-left-radius: 10px;
			border-top-right-radius: 10px;
			background-color: #f7f7f7;
			padding: 3px 0;
		}

		.footer {
			text-align: right;
			padding: 10px 0;
			text-align: center;
			border-bottom-left-radius: 10px;
			border-bottom-right-radius: 10px;
			background-color: #f7f7f7;
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

		.primaryBtn {
			padding: 5px 10px;
			color: #0d6efd;
			font-size: .79rem;
			text-decoration: none;
			border-radius: 25px;
		}

		.foot-td {
			padding-bottom: 5px;
			width: 50%;
		}

		.mTop {
			padding: 10px 0;
		}

		.rights {
			text-align: center;
			font-size: 0.59rem;
			color: #bbb;
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
			<div><em><?php echo $signature; ?></em></div>
			<table width="100%">
				<tr>
					<td style="width:30px;">
						<img height="25" width="25" src="<?php echo base_url() . 'api/media/render?X-Access-Key=' . $globalConfig[0]['fileStorageAccessKey'] . '&fileURL=/logo/PNG/greenIconNoBackground.png' ?>" />
					</td>
					<td>
						<?php echo $signatureCompany; ?>
					</td>
				</tr>
			</table>
		</section>
		<footer class="footer">
			<table class="textCenter" width="100%">
				<tr>
					<td class="foot-td">
						<div><a class="primaryBtn" target="_blank" href="<?php echo $globalConfig[0]['appWeb']; ?>"><?php echo $globalConfig[0]['appWeb']; ?></a></div>
					</td>
					<td class="foot-td">
						<div><a class="primaryBtn" target="_blank" href="<?php echo $globalConfig[0]['privacyPolicyLink']; ?>">Privacy policy</a></div>
					</td>
				</tr>
				<tr>
					<td class="foot-td">
						<div><a class="primaryBtn" href="mailto:<?php echo $globalConfig[0]['appSupportEmail']; ?>"><?php echo $globalConfig[0]['appSupportEmail']; ?></a></div>

					</td>
					<td class="foot-td">
						<div><a class="primaryBtn" target="_blank" href="<?php echo $globalConfig[0]['termsOfServiceLink']; ?>">Terms & conditions</a></div>
					</td>
				</tr>
				<tr>
					<td class="foot-td">
						<div><a class="primaryBtn" target="_blank" href="<?php echo $globalConfig[0]['appDocLink']; ?>">Documentation</a></div>
					</td>
					<td class="foot-td">
						<div><a class="primaryBtn" target="_blank" href="<?php echo $globalConfig[0]['cancellationRefundPolicyLink']; ?>">Refund policy</a></div>
					</td>
				</tr>
			</table>
			<table class="textCenter mTop" align="center" cellpadding="5">
				<tr>
					<td>
						<a target="_blank" href="<?php echo $globalConfig[0]['facebookUrl']; ?>"><img height="25" width="25" src="https://cdn-icons-png.flaticon.com/512/145/145802.png" /></a>
					</td>
					<td>
						<a target="_blank" href="<?php echo $globalConfig[0]['instagramUrl']; ?>"><img height="25" width="25" src="https://cdn-icons-png.flaticon.com/512/1384/1384063.png" /></a>
					</td>
					<td>
						<a target="_blank" href="<?php echo $globalConfig[0]['linkedInUrl']; ?>"><img height="25" width="25" src="https://cdn-icons-png.flaticon.com/512/174/174857.png" /></a>
					</td>
					<td>
						<a target="_blank" href="<?php echo $globalConfig[0]['twitterUrl']; ?>"><img height="25" width="25" src="https://cdn-icons-png.flaticon.com/512/2496/2496110.png" /></a>
					</td>
				</tr>
			</table>
			<div class="rights">All rights reserved &#169;</div>
		</footer>
	</div>

</body>

</html>