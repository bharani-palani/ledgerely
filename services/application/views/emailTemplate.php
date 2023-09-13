<!DOCTYPE html>
<html lang="en">
<head>
	<style type="text/css">
	body {
		background-color: #ffffff;
		margin: 0 200px;
        color: <?php echo $globalConfig[0]['webThemeColor'];?>;
		font: 13px/20px normal Helvetica, Arial, sans-serif;
	}
	.container{
		margin: 10px;
		border: 1px solid #DDD;
		-webkit-box-shadow: 0 0 8px #DDD;
		-moz-box-shadow: 0 0 8px #DDD;
        border-radius: 10px;
	}
    .content{
        padding: 10px;
    }
	.header {
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
		background-color: <?php echo $globalConfig[0]['webThemeBackground'];?>;
		border-bottom: 1px solid #D0D0D0;
		padding: 20px 0;
        font-size: 17px;
        text-align: center;
	}
	
	.footer{
		text-align: right;
		font-size: 14px;
		border-top: 1px solid #D0D0D0;
		padding: 20px 0;
        text-align: center;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        color: <?php echo $globalConfig[0]['webThemeBackground'];?>;
		background-color: <?php echo $globalConfig[0]['webThemeColor'];?>;
	}	
    .footer a{
        color: <?php echo $globalConfig[0]['webThemeBackground'];?>;
    }
	</style>
</head>
<body>

<div class="container">
	<header class="header">Welcome to <?php echo $globalConfig[0]['appName'];?>!</header>
    <section class="content">
        <p><?php echo $saluation;?></p>
        <?php foreach ($matter as $value) { ?>
            <p><?php echo $value; ?></p>
        <?php } ?>
        <p>
            <div><?php echo $signature;?></div>
            <em><?php echo $signatureCompany;?></em>
        </p>
    </section>
	<footer class="footer"><?php echo $disclaimer; ?></footer>
</div>

</body>
</html>