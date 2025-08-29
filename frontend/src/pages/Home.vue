<template>
  <div class="min-h-screen bg-primary text-text-primary overflow-x-hidden">
    <div class="bg-animation"></div>

    <nav class="fixed top-0 w-full bg-primary/95 backdrop-blur-md border-b border-gray-800 shadow-sm z-50 transition-all duration-300">
      <div class="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <router-link to="/" class="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-accent-cyan to-accent-purple bg-clip-text text-black flex items-center cursor-pointer">
              <svg class="w-8 h-8 mr-2 text-accent-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                ></path>
              </svg>
              VistaView
            </router-link>
          </div>

          <div class="hidden md:flex items-center gap-8">
            <a href="#features" class="relative text-black hover:text-gray-800 transition-colors duration-300 after:absolute after:left-1/2 after:bottom-0 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full">
              Features
            </a>
            <a
              href="#testimonials"
              class="relative text-black hover:text-gray-800 transition-colors duration-300 after:absolute after:left-1/2 after:bottom-0 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full"
            >
              Testimonials
            </a>
            <a
              href="#pricing"
              class="relative text-black hover:text-gray-800 transition-colors duration-300 after:absolute after:left-1/2 after:bottom-0 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full"
            >
              Pricing
            </a>

            <router-link to="/login" class="bg-black text-white px-5 py-2 rounded-lg text-base font-medium hover:scale-105 transition-all duration-300 shadow-md">
              Sign In
            </router-link>

            <router-link to="/signup" class="bg-white text-black border-2 border-black px-5 py-2 rounded-lg text-base font-medium shadow-md hover:scale-105 transition-all duration-300">
              Get Started
            </router-link>
          </div>

          <button @click="toggleMobileMenu" class="md:hidden p-2 rounded-lg bg-white text-black border border-black transition-all duration-300 cursor-pointer shadow-sm">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                v-if="!mobileMenuOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div v-show="mobileMenuOpen" class="md:hidden bg-white border border-black rounded-xl mt-2 p-4 shadow-lg">
          <div class="flex flex-col space-y-4">
            <a href="#features" @click="mobileMenuOpen = false" class="block text-black text-base font-medium hover:bg-black hover:text-white transition-colors duration-300 rounded-lg px-3 py-2">
              Features
            </a>
            <a
              href="#testimonials"
              @click="mobileMenuOpen = false"
              class="block text-black text-base font-medium hover:bg-black hover:text-white transition-colors duration-300 rounded-lg px-3 py-2"
            >
              Testimonials
            </a>
            <a
              href="#pricing"
              @click="mobileMenuOpen = false"
              class="block text-black text-base font-medium hover:bg-black hover:text-white transition-colors duration-300 rounded-lg px-3 py-2"
            >
              Pricing
            </a>

            <router-link to="/login" @click="mobileMenuOpen = false" class="block text-center border border-black text-black font-medium rounded-lg px-3 py-2 transition-colors duration-300 hover:bg-black hover:text-white">
              Sign In
            </router-link>

            <router-link to="/signup" @click="mobileMenuOpen = false" class="block w-full text-center bg-black text-white font-medium rounded-lg py-2 transition-colors duration-300 hover:bg-gray-800 border border-black">
              Get Started
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <section class="min-h-screen flex items-center justify-center py-24 px-6 relative overflow-hidden">
      <div class="max-w-4xl mx-auto text-center">
        <div class="inline-flex items-center px-2 py-1 text-sm font-semibold text-accent-purple bg-accent-purple/10 rounded-full mb-8 shadow-sm">
          🚀 Trusted by 10,000+ professionals
        </div>

        <h1 class="text-5xl font-extrabold mb-6 leading-tight tracking-tight text-black">
          Transform Data Into
          <span class="bg-gradient-to-r from-accent-cyan to-accent-purple bg-clip-text text-black block mt-3">
            Actionable Insights
          </span>
        </h1>

        <p class="text-lg max-w-3xl mx-auto mb-12 leading-relaxed">
          A powerful data visualization platform that helps teams unlock clarity
          with interactive dashboards, AI-powered insights, and real-time
          analytics.
        </p>

        <div class="flex flex-col sm:flex-row gap-5 justify-center items-center">
          <router-link
            to="/signup"
            class="bg-gradient-to-r from-accent-cyan to-accent-purple text-black px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
          >
            Start Free Trial
          </router-link>
          <button
            @click="scrollToDemo"
            class="cursor-pointer flex items-center gap-2 text-gray-800 transition-colors duration-300 bg-white border border-gray-300 px-8 py-3.5 rounded-xl shadow-md hover:shadow-lg"
          >
            <span class="text-xl">▶</span>
            <span class="font-medium">Watch Demo</span>
          </button>
        </div>
      </div>

      <div class="absolute top-0 left-0 w-72 h-72 bg-accent-cyan/20 rounded-full filter blur-3xl opacity-30 -z-10"></div>
      <div class="absolute bottom-0 right-0 w-80 h-80 bg-accent-purple/20 rounded-full filter blur-3xl opacity-30 -z-10"></div>
    </section>

    <section id="features" class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-14">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
            Key Features
          </h2>
          <p class="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Everything you need to transform raw data into actionable insights
          </p>
        </div>

        <div class="mt-16 grid gap-12 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="group h-full bg-white text-black border border-gray-200 p-8 rounded-2xl shadow-md transition-all duration-300 ease-in-out cursor-pointer relative overflow-hidden hover:shadow-lg hover:-translate-y-1"
          >
            <div class="w-16 h-16 bg-accent-cyan/10 rounded-full flex items-center justify-center mb-6">
              <component :is="feature.icon" class="w-8 h-8 text-accent-cyan" />
            </div>

            <h3 class="text-xl font-semibold text-gray-900 mb-2">
              {{ feature.title }}
            </h3>

            <p class="text-gray-600 text-base">
              {{ feature.description }}
            </p>

            <div class="absolute inset-0 border-2 border-transparent rounded-2xl transition-all duration-500 ease-in-out group-hover:border-accent-cyan"></div>
          </div>
        </div>
      </div>
    </section>

    <section id="testimonials" class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-14">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
            What Our Customers Say
          </h2>
          <p class="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Hear from professionals who have transformed their data with VistaView.
          </p>
        </div>

        <div class="mt-16 grid gap-8 md:grid-cols-2 lg:gap-12">
          <div
            v-for="testimonial in testimonials"
            :key="testimonial.name"
            class="cursor-pointer bg-white rounded-xl shadow-md p-8 flex flex-col justify-between"
          >
            <figure>
              <blockquote class="text-gray-700 italic text-lg mb-6">
                "{{ testimonial.quote }}"
              </blockquote>
              <figcaption class="flex items-center">
              <div class="w-12 h-12 rounded-full bg-gradient-to-r from-accent-cyan to-accent-purple flex items-center justify-center text-white font-bold text-xl mr-4">
                {{ testimonial.initials }}
              </div>
              <div>
                <p class="font-semibold text-gray-900">{{ testimonial.name }}</p>
                <p class="text-gray-500 text-sm">{{ testimonial.role }}</p>
              </div>
            </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-white">
      <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">
          Ready to Transform Your Data?
        </h2>
        <p class="text-lg text-gray-600 mb-10">
          Join the future of data visualization. Start your free trial today and
          experience the power of Vistaview.
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link
            to="/signup"
            class="inline-block bg-gradient-to-r from-accent-cyan to-accent-purple text-black px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Start Free Trial
          </router-link>
        </div>
      </div>
    </section>

    <footer class="bg-gray-900 text-white py-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div
              class="text-xl font-bold bg-gradient-to-r from-accent-cyan to-accent-purple bg-clip-text text-white flex items-center mb-4"
            >
              <svg
                class="w-6 h-6 mr-2 text-accent-cyan"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                ></path>
              </svg>
              VistaView
            </div>
            <p class="text-sm text-gray-400">
              Transform your data into actionable insights.
            </p>
          </div>
          <div>
            <h4 class="text-base font-semibold mb-4 text-white">Product</h4>
            <ul class="space-y-2" style="list-style: none; padding: 0;">
              <li><a href="#features" class="text-sm text-gray-400 hover:text-white transition-colors duration-300">Features</a></li>
              <li><a href="#pricing" class="text-sm text-gray-400 hover:text-white transition-colors duration-300">Pricing</a></li>
              <li><a href="#" class="text-sm text-gray-400 hover:text-white transition-colors duration-300">API</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-base font-semibold mb-4 text-white">Support</h4>
            <ul class="space-y-2 footer-links">
              <li><a href="#" class="text-sm text-gray-400 hover:text-white transition-colors duration-300">Documentation</a></li>
              <li><a href="#" class="text-sm text-gray-400 hover:text-white transition-colors duration-300">Contact</a></li>
              <li><a href="#" class="text-sm text-gray-400 hover:text-white transition-colors duration-300">Help Center</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-base font-semibold mb-4 text-white">Company</h4>
            <ul class="space-y-2 footer-links">
              <li><a href="#" class="text-sm text-gray-400 hover:text-white transition-colors duration-300">About</a></li>
              <li><a href="#" class="text-sm text-gray-400 hover:text-white transition-colors duration-300">Careers</a></li>
              <li><a href="#" class="text-sm text-gray-400 hover:text-white transition-colors duration-300">Privacy</a></li>
            </ul>
          </div>
        </div>
        <div
          class="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-400"
        >
          <p>&copy; 2025 VistaView. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import {
  ChartBarIcon,
  ViewColumnsIcon,
  ShieldCheckIcon,
} from "@heroicons/vue/24/outline";

export default {
  name: "Home",
  components: {
    ChartBarIcon,
    ViewColumnsIcon,
    ShieldCheckIcon,
  },
  data() {
    return {
      mobileMenuOpen: false,
      features: [
        {
          title: "Real-time Analytics",
          description:
            "Get instant insights with live data streaming and real-time dashboard updates.",
          icon: "ChartBarIcon",
        },
        {
          title: "Interactive Dashboards",
          description:
            "Create stunning visualizations with our drag-and-drop dashboard builder.",
          icon: "ViewColumnsIcon",
        },
        {
          title: "Advanced Security",
          description:
            "Enterprise-grade security with encryption and role-based access control.",
          icon: "ShieldCheckIcon",
        },
      ],
      testimonials: [
        {
          name: "Sarah Johnson",
          role: "Data Analyst at TechCorp",
          quote:
            "VistaView has completely transformed how we analyze our data. The real-time insights have helped us make better decisions faster.",
          initials: "SJ",
        },
        {
          name: "Michael Chen",
          role: "Product Manager at StartupXYZ",
          quote:
            "The interactive dashboards are incredibly intuitive. Our team was up and running within minutes, creating reports that used to take days.",
          initials: "MC",
        },
      ],
    };
  },
  methods: {
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
    },
    scrollToDemo() {
      document
        .getElementById("features")
        .scrollIntoView({ behavior: "smooth" });
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
};
</script>

<style scoped>
/* Define primary colors if you have a tailwind.config.js, otherwise use direct values */
.bg-primary {
  background-color: #f9fafb; /* Example: light gray */
}
.text-text-primary {
  color: #111827; /* Example: dark gray */
}
.text-accent-cyan {
  color: #22d3ee;
}
.bg-accent-cyan\/10 {
  background-color: rgba(34, 211, 238, 0.1);
}
.bg-accent-cyan\/20 {
  background-color: rgba(34, 211, 238, 0.2);
}
.text-accent-purple {
  color: #a855f7;
}
.bg-accent-purple\/10 {
  background-color: rgba(168, 85, 247, 0.1);
}
.bg-accent-purple\/20 {
  background-color: rgba(168, 85, 247, 0.2);
}
.border-accent-cyan {
  border-color: #22d3ee;
}

/* Background animation */
.bg-animation {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -10;
  background:
    radial-gradient(
      circle at 20% 80%,
      rgba(139, 92, 246, 0.1) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 20%,
      rgba(0, 245, 255, 0.08) 0%,
      transparent 50%
    );
  background-size: 200% 200%;
  animation: backgroundShift 15s ease-in-out infinite alternate;
}
@keyframes backgroundShift {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 100% 100%;
  }
}
.animate-pulse-slow {
  animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

/* Cleanup duplicate/inline styles */
.footer-links li a {
  font-size: 0.875rem;
  color: #9ca3af; /* text-gray-400 */
  text-decoration: none;
  transition: color 0.3s ease-in-out;
}
.footer-links li a:hover {
  color: white;
}
</style>