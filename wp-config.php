<?php
define('WP_CACHE', true); // WP-Optimize Cache
 // WP-Optimize Cache
 // WP-Optimize Cache
 // WP-Optimize Cache
# BEGIN WP Cache by 10Web
define( 'TWO_PLUGIN_DIR_CACHE', '/var/www/html/wp-content/plugins/tenweb-speed-optimizer/' );
# END WP Cache by 10Web
define('WP_HOME', 'https://sdlccorp.com');
define('WP_SITEURL', 'https://sdlccorp.com');
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */
// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'wordpress' );
/** Database username */
define( 'DB_USER', 'wordpress' );
/** Database password */
define( 'DB_PASSWORD', 'c526e80e5b9361d46312e4db61bbb28c0b5d4050fe04c2e7' );
/** Database hostname */
define( 'DB_HOST', 'localhost' );
/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );
/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );
/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'lwkNaH-]EVU9x5I}uJ&-79b6xb9Jb:42J%mP6@8ch9/M},)>NGATYhe~86vYv%9M' );
define( 'SECURE_AUTH_KEY',  '<E:XL+0?]5PIa(*M-_Lets@_I.ZX@<[P{k3`nPKMx8bxB _`Sg|3u2pBUd:V!fn/' );
define( 'LOGGED_IN_KEY',    'fxMGk GCj1]fJiGDyyd2fM0nDki(I8U=-H(xQ9S;DZKO/MX^5kXx(s<[IU4`$Nch' );
define( 'NONCE_KEY',        '${^3(kXI{K-QrF+t0Q~9@]Q/TZ[oqD(dM=wj<_*cj7j)u=O(Za@b:2~rDnW5=xt0' );
define( 'AUTH_SALT',        'KZS2z@3A$-$UO.8FiF=!sK|Y$`emtLJQw3i:2bVo_FdXr$u;x(nDKqg2LCB^7zW#' );
define( 'SECURE_AUTH_SALT', ')^a&,?+D>y=LCligiv;ta|6*4EaD8-$&=4pVyrVH]!^Mzh($&>|sbiKC?ROS+w7)' );
define( 'LOGGED_IN_SALT',   'fGAn-pzg3h0,xeQRF<x~B- t;5|utbN}M/%rE$]|U0W2Z>.D9#=S*8&:Uf.s<Zaq' );
define( 'NONCE_SALT',       'Va<ezJvv_-H<0m<`pFKJU}K~J.>fiRQm-Nl|x/lbO0WmD+He()<_qy$TJWc?s0Gh' );
/**#@-*/
/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';
/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );
define('WP_ALLOW_REPAIR', true);
/* Add any custom values between this line and the "stop editing" line. */
/* That's all, stop editing! Happy publishing. */
/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}
/** Sets up WordPress vars and included files. */
define( 'WP_MEMORY_LIMIT', '512M' );
require_once ABSPATH . 'wp-settings.php';