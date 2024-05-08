/** @type {import('next').NextConfig} */

const { i18n } = require('./next-i18next.config');
const withPWA = require('next-pwa')({
  disable: process.env.NODE_ENV === 'development',
  dest: 'public',
});

module.exports = withPWA({
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['page.tsx', 'tsx', 'ts'],
  i18n,
});
