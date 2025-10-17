/** @type {import('next').NextConfig} */
const nextConfig = {
   distDir: 'build',
   output: 'export',
   basePath: '/app',
   trailingSlash: true,
  images: {
    domains: ['127.0.0.1','www.enconjuntoalamano.com'], 
    unoptimized:true
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    hot: true
  },
  env: {
    //NEXT_PUBLIC_SERVE: 'https://www.itscolombiapruebas.com/app',
    //NEXT_PUBLIC_API: 'https://www.itscolombiapruebas.com/app/backend/public/',

    NEXT_PUBLIC_SERVE: 'https://www.enconjuntoalamano.com/app',
    NEXT_PUBLIC_API: 'https://www.enconjuntoalamano.com/app/backend/public/',
    
    //NEXT_PUBLIC_SERVE: 'http://localhost:4554/',
    //NEXT_PUBLIC_API: 'http://127.0.0.1:8000/',
  }
};

module.exports = nextConfig;
