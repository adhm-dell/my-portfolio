import { PrismaClient, MediaType } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding database...');

  // 1. Create Admin User (Clean DB first if necessary, but here we just upsert)
  const passwordHash = await bcrypt.hash('admin123', 10);
  await prisma.adminUser.upsert({
    where: { email: 'admin@adhm.com' },
    update: {},
    create: {
      email: 'admin@adhm.com',
      passwordHash,
    },
  });

  // 2. Profile
  await prisma.siteProfile.deleteMany();
  await prisma.siteProfile.create({
    data: {
      nameEn: 'Adham Salah',
      nameAr: 'أدهم صلاح',
      roleTitleEn: 'Full Stack Software Engineer',
      roleTitleAr: 'مهندس برمجيات Full Stack',
      headlineEn: 'Building Scalable Digital Products From Idea to Production',
      headlineAr: 'أقوم ببناء منتجات رقمية قابلة للتوسع بداية من الفكرة وحتى الإطلاق الفعلي.',
      bioEn: 'I am a Full Stack Software Engineer passionate about building complete, scalable, and production-ready digital products. My journey spans the full engineering spectrum: from architectural blueprints and database modeling to frontend interfaces, backend APIs, authentication, payment integrations, and deployment on production VPS servers.',
      bioAr: 'أنا مهندس برمجيات Full Stack شغوف ببناء منتجات رقمية متكاملة وقابلة للتوسع وجاهزة للاستخدام الفعلي. تمتد خبرتي عبر جميع مراحل تطوير السوفتوير: بداية من التخطيط المعماري وهندسة قواعد البيانات، مرورًا بتطوير واجهات المستخدم، وبناء واجهات الـ API الخلفية، وأنظمة الأمان والدفع، وحتى النشر والإطلاق على سيرفرات Production.',
      gpa: '3.65',
      educationEn: 'Faculty of Computers and Information, Helwan University, Cairo — Graduated 2026',
      educationAr: 'كلية الحاسبات والمعلومات، جامعة حلوان، القاهرة — خريج 2026',
      graduationYear: 2026,
      linkedinUrl: 'https://linkedin.com/in/adhm-salah-283343270',
      githubUrl: 'https://github.com/adhm-dell',
      email: 'adhamsalah.eng@gmail.com',
    },
  });

  // 3. About Content
  await prisma.aboutContent.deleteMany();
  await prisma.aboutContent.createMany({
    data: [
      {
        paragraphEn: 'I am a Full Stack Software Engineer passionate about building complete, scalable, and production-ready digital products. My journey spans the full engineering spectrum: from architectural blueprints and database modeling to frontend interfaces, backend APIs, authentication, payment integrations, and deployment on production VPS servers.',
        paragraphAr: 'أنا مهندس برمجيات Full Stack شغوف ببناء منتجات رقمية متكاملة وقابلة للتوسع وجاهزة للاستخدام الفعلي. تمتد خبرتي عبر جميع مراحل تطوير السوفتوير: بداية من التخطيط المعماري وهندسة قواعد البيانات، مرورًا بتطوير واجهات المستخدم، وبناء واجهات الـ API الخلفية، وأنظمة الأمان والدفع، وحتى النشر والإطلاق على سيرفرات Production.',
        order: 1,
      },
      {
        paragraphEn: 'My experience covers modern web platforms, SaaS ecosystems, high-volume e-commerce, offline desktop utilities, AI integrations, and real-time socket communication. My obsession is delivering dependable software that solves actual business problems, never just trivial toy demonstrations.',
        paragraphAr: 'لدي خبرة عميقة في تطوير تطبيقات الويب الحديثة، ومنصات SaaS، وأنظمة التجارة الإلكترونية، وتطبيقات سطح المكتب (Desktop)، والمنصات المدعومة بالذكاء الاصطناعي (AI/LLMs)، والأنظمة اللحظية Real-Time. تركيزي الدائم هو تقديم حلول برمجية تحل مشاكل حقيقية، وليس مجرد مشاريع Demo شكلية.',
        order: 2,
      }
    ],
  });

  // 4. Experience
  await prisma.experience.deleteMany();
  await prisma.experience.create({
    data: {
      roleEn: 'Full Stack Developer',
      roleAr: 'مطور Full Stack',
      company: 'Motive Media',
      durationLabel: '6 Months',
      descriptionEn: 'Contributed to the end-to-end software cycle: developing interactive frontend applications, designing and maintaining RESTful backend endpoints, orchestrating PostgreSQL databases, and deploying client-facing production features.',
      descriptionAr: 'المشاركة في دورة تطوير البرمجيات كاملة: تطوير واجهات المستخدم التفاعلية، وتصميم نقاط RESTful APIs، وإدارة قواعد بيانات PostgreSQL، ونشر الميزات في بيئة العمل الحقيقية.',
      responsibilitiesEn: [
        'Building Responsive Frontend Applications',
        'Developing Backend APIs & Authentication',
        'Database Modeling & Integration',
        'Shipping Production Features & Fixes'
      ],
      responsibilitiesAr: [
        'بناء واجهات أمامية تفاعلية متجاوبة',
        'تطوير Backend APIs وأنظمة التحقق والصلاحيات',
        'تصميم ودمج قواعد البيانات وإدارتها',
        'إطلاق الميزات ومعالجة المشاكل في بيئة الإنتاج'
      ],
      location: 'Cairo, Egypt',
      order: 1,
    }
  });

  // 5. Skill Categories and Skills
  await prisma.skillCategory.deleteMany();
  
  const categories = [
    {
      key: 'frontend',
      titleEn: 'Frontend Architecture', titleAr: 'معمارية الواجهات الأمامية',
      subtitleEn: 'Modern UI & State', subtitleAr: 'تصميم واجهات حديثة',
      icon: 'layout', order: 1,
      skills: ['React', 'React 19', 'TypeScript', 'JavaScript', 'Vite', 'React Router v7', 'Tailwind CSS', 'Shadcn UI', 'TanStack Query', 'React Hook Form', 'Zod', 'Recharts', 'Responsive Design', 'RTL/LTR', 'Internationalization', 'PWA', 'Vite PWA']
    },
    {
      key: 'backend',
      titleEn: 'Backend & APIs', titleAr: 'الواجهات الخلفية والـ APIs',
      subtitleEn: 'Service-Layer Systems', subtitleAr: 'أنظمة مبنية على الخدمات',
      icon: 'server', order: 2,
      skills: ['Node.js', 'NestJS', 'NestJS 11', 'ElysiaJS', 'Laravel', 'REST APIs', 'API Architecture', 'Authentication', 'JWT', 'Passport', 'RBAC', 'WebSockets', 'Socket.io', 'Real-Time Applications', 'Service Layer Architecture']
    },
    {
      key: 'database',
      titleEn: 'Databases & Modeling', titleAr: 'قواعد البيانات والنمذجة',
      subtitleEn: 'Relational & In-Memory', subtitleAr: 'الأنظمة العلائقية والمؤقتة',
      icon: 'database', order: 3,
      skills: ['PostgreSQL', 'Prisma ORM', 'Drizzle ORM', 'Redis', 'Database Design', 'Database Architecture', 'Relational Databases', 'Complex Data Modeling']
    },
    {
      key: 'ai',
      titleEn: 'AI & LLM Integration', titleAr: 'الذكاء الاصطناعي و LLMs',
      subtitleEn: 'Generative Automation', subtitleAr: 'الأتمتة التوليدية',
      icon: 'sparkles', order: 4,
      skills: ['AI Integration', 'LLMs', 'LLM Integration', 'OpenRouter', 'DeepSeek', 'Cerebras', 'Qwen', 'AI-Powered Applications', 'AI Training Plan Generation', 'AI Nutrition Plan Generation', 'Prompt Engineering', 'AI API Integration']
    },
    {
      key: 'desktop',
      titleEn: 'Desktop Applications', titleAr: 'تطبيقات سطح المكتب',
      subtitleEn: 'Offline-First Software', subtitleAr: 'برمجيات تعمل بدون إنترنت',
      icon: 'monitor', order: 5,
      skills: ['Electron', 'React + Electron', 'Offline Desktop Applications', 'Business Management Systems', 'Inventory Systems']
    },
    {
      key: 'devops',
      titleEn: 'DevOps & Real-Time', titleAr: 'البنية التحتية والأنظمة اللحظية',
      subtitleEn: 'Production Deployment', subtitleAr: 'النشر للإنتاج',
      icon: 'cloud', order: 6,
      skills: ['Docker', 'Docker Compose', 'VPS', 'Linux', 'Nginx', 'Cloudflare', 'HTTPS', 'Production PostgreSQL', 'Redis', 'Database Backups', 'GitHub Actions', 'CI/CD', 'SSH Deployment', 'Production Infrastructure']
    }
  ];

  for (const cat of categories) {
    const createdCat = await prisma.skillCategory.create({
      data: {
        key: cat.key,
        titleEn: cat.titleEn,
        titleAr: cat.titleAr,
        subtitleEn: cat.subtitleEn,
        subtitleAr: cat.subtitleAr,
        icon: cat.icon,
        order: cat.order,
      }
    });

    for (let i = 0; i < cat.skills.length; i++) {
      await prisma.skill.create({
        data: {
          name: cat.skills[i],
          categoryId: createdCat.id,
          order: i + 1,
        }
      });
    }
  }

  // 6. Projects
  await prisma.project.deleteMany();

  const p1 = await prisma.project.create({
    data: {
      slug: 'fr3onfit',
      category: 'saas',
      badgeEn: 'Flagship System',
      badgeAr: 'المشروع الأكبر',
      order: 1,
      isFeatured: true,
      titleEn: 'FR3ON FIT',
      titleAr: 'FR3ON FIT',
      subtitleEn: 'Complete Coach & Trainee Fitness Platform with AI Plan Generation',
      subtitleAr: 'منصة فيتنس متكاملة تربط بين الكوتشز والمتدربين مع توليد الأنظمة بالذكاء الاصطناعي',
      descriptionEn: 'FR3ON FIT is one of my largest and most comprehensive projects, developed over approximately one full year. It is an end-to-end fitness ecosystem connecting coaches and trainees while delivering sophisticated tools for workouts, nutrition, real-time messaging, payments, and automated AI plan generation.',
      descriptionAr: 'FR3ON FIT هو واحد من أكبر وأهم المشاريع التي قمت بالعمل عليها لمدة عام كامل تقريبًا. المنصة عبارة عن نظام بيئي متكامل للياقة البدنية يربط الكوتشز بالمتدربين ويوفر أدوات احترافية للتمارين، التغذية، متابعة التطور، الشات اللحظي، الدفع الإلكتروني، وتوليد البرامج بالذكاء الاصطناعي.',
      problemEn: 'Fitness coaches and clients struggle with fragmented workflows: separate chat apps, PDF workouts, manual payment tracking, and disconnected nutrition logging leading to low engagement and operational fatigue.',
      problemAr: 'يعاني المدربون والمتدربون من تشتت الأدوات: الاعتماد على واتساب للمحادثات، وملفات PDF للتمارين، وتتبع المدفوعات يدويًا، وصعوبة حساب السعرات الدقيقة مما يقلل الالتزام ويزيد الإرهاق الإداري.',
      solutionEn: 'Engineered a unified SaaS architecture with dedicated coach and trainee portals, automated real-time chat channels, Kashier payment processing, a library of 1,500+ animated exercises, and custom OpenRouter AI engines that produce complete personalized training & diet plans with a single click.',
      solutionAr: 'تم بناء منصة سحابية متكاملة تدعم بوابات مخصصة للكوتش والمتدرب، وشات لحظي عبر WebSockets، وتكامل دفع إلكتروني عبر Kashier، ومكتبة تضم 1500+ تمرين مع GIF توضيحي، ومحركات ذكاء اصطناعي تولد أنظمة تدريب وتغذية كاملة مخصصة بضغطة زر.',
      featuresEn: [
        'Trainer and Trainee dual-role platform with rigorous admin verification approval',
        'Advanced workout creator with sets, reps, weight, and Reps In Reserve (RIR) tracking',
        'Nutrition database based on OpenNutrition containing hundreds of thousands of food entries',
        'AI-powered workout & nutrition generator using OpenRouter, DeepSeek & Qwen',
        'Real-time chat channels with instant socket communication between coach and client',
        'Automated payment gateway integration using Kashier for subscription handling',
        'Comprehensive administrative metrics dashboard for platform oversight'
      ],
      featuresAr: [
        'منصة للكوتشز والمتدربين مع نظام صلاحيات واعتماد ومراجعة للمدربين',
        'نظام متقدم لمتابعة التمارين، الأوزان، التكرارات، ومعدل الجهد RIR',
        'مكتبة غذائية ضخمة مبنية على OpenNutrition تضم مئات الآلاف من العناصر الغذائية',
        'أدوات ذكاء اصطناعي عبر OpenRouter و DeepSeek لإنشاء أنظمة تمرين وتغذية بضغطة زر',
        'شات لحظي فوري (Socket.io) مع قنوات محادثة منظمة',
        'تكامل الدفع الإلكتروني مع بوابة Kashier وإدارة الاشتراكات',
        'لوحة تحكم إدارية (Admin Dashboard) متكاملة للإحصائيات وإدارة النظام'
      ],
      technologies: ['React 19', 'NestJS 11', 'PostgreSQL', 'Prisma', 'Redis', 'Socket.io', 'OpenRouter AI', 'DeepSeek', 'Kashier', 'Docker', 'Nginx'],
      liveUrl: 'https://fr3onfit.com',
      githubUrl: 'https://github.com/adhm-dell',
      coverImageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop',
      year: 2026,
    }
  });

  await prisma.projectMedia.createMany({
    data: [
      { projectId: p1.id, type: MediaType.IMAGE, url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop', titleEn: 'Coach Dashboard', tagEn: 'Dashboard', tagAr: 'لوحة التحكم', order: 1 },
      { projectId: p1.id, type: MediaType.IMAGE, url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop', titleEn: 'AI Plan Generator', tagEn: 'AI Engine', tagAr: 'محرك الذكاء', order: 2 },
      { projectId: p1.id, type: MediaType.IMAGE, url: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1200&auto=format&fit=crop', titleEn: 'Exercise Library', tagEn: 'Exercise DB', tagAr: 'مكتبة التمارين', order: 3 },
      { projectId: p1.id, type: MediaType.YOUTUBE, url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', titleEn: 'Complete FR3ON FIT System Walkthrough', descriptionEn: 'Full architecture overview', durationLabel: '08:45', order: 4 },
      { projectId: p1.id, type: MediaType.YOUTUBE, url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', titleEn: 'AI Plan Generation Engine in Action', descriptionEn: 'DeepSeek in action', durationLabel: '04:12', order: 5 },
    ]
  });

  const p2 = await prisma.project.create({
    data: {
      slug: 'fr3onstore',
      category: 'saas',
      badgeEn: 'E-Commerce Platform',
      badgeAr: 'متجر إلكتروني',
      order: 2,
      isFeatured: false,
      titleEn: 'FR3ON STORE',
      titleAr: 'FR3ON STORE',
      subtitleEn: 'High-Performance E-Commerce Platform',
      subtitleAr: 'متجر إلكتروني عالي الأداء',
      descriptionEn: 'FR3ON STORE is a full-fledged modern commerce platform designed to handle fitness apparel, supplements, and merchandise. Built with Laravel 11, Livewire, Filament admin, and Redis caching for optimal conversion rates and lightning-fast checkout.',
      descriptionAr: 'FR3ON STORE هو منصة تجارة إلكترونية متكاملة لبيع الملابس الرياضية والمكملات والمعدات، مبني باستخدام Laravel 11 و Livewire ولوحة تحكم Filament وإدارة كاشينج مع Redis لتحقيق أعلى سرعة تصفح وتجربة شراء سلسة.',
      problemEn: 'Generic commerce templates suffer from slow product filtering, bulky checkout processes, and cumbersome back-office inventory reconciliation.',
      problemAr: 'المتاجر التقليدية تواجه بطء في الفلترة وتجارب دفع معقدة ولوحات تحكم غير متجاوبة مع متطلبات إدارة المخزون اللحظي.',
      solutionEn: 'Engineered a tailored commerce stack with reactive Livewire components, instant cart state syncing, automated payment verification, and an ultra-clean Filament v3 administration dashboard.',
      solutionAr: 'تطوير متجر عالي السرعة بواجهات تفاعلية عبر Livewire، وتزامن فوري لسلة الشراء، وإدارة متكاملة للطلبات والمخزون من خلال لوحة Filament الحديثة.',
      featuresEn: [
        'Dynamic product filtering by brand, category, dietary specs, and price',
        'Frictionless multi-step checkout with real-time stock validation',
        'Comprehensive Filament administrative dashboard for order fulfillment',
        'Containerized deployment using Docker, Nginx reverse proxy, and Redis cache'
      ],
      featuresAr: [
        'فلترة ديناميكية سريعة للمنتجات حسب التصنيف والماركة والأسعار',
        'سلة تسوق وتدفق دفع فوري مع تأكيد حالة المخزون لحظيًا',
        'لوحة تحكم إدارية متقدمة مبنية بـ Filament لإدارة الشحنات والطلبات',
        'نشر وتشغيل على سيرفرات سحابية باستخدام Docker و Nginx و Redis'
      ],
      technologies: ['Laravel 11', 'Livewire', 'Filament', 'PostgreSQL', 'Redis', 'Docker', 'Nginx'],
      liveUrl: 'https://store.fr3onfit.com',
      githubUrl: 'https://github.com/adhm-dell',
      coverImageUrl: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1200&auto=format&fit=crop',
      year: 2025,
    }
  });

  await prisma.projectMedia.createMany({
    data: [
      { projectId: p2.id, type: MediaType.IMAGE, url: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1200&auto=format&fit=crop', titleEn: 'Storefront', tagEn: 'Storefront', tagAr: 'المتجر', order: 1 },
      { projectId: p2.id, type: MediaType.YOUTUBE, url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', titleEn: 'Storefront & Reactive Checkout Demo', durationLabel: '05:15', order: 2 },
    ]
  });

  const p3 = await prisma.project.create({
    data: {
      slug: 'barx',
      category: 'desktop',
      badgeEn: 'Offline Desktop Application',
      badgeAr: 'تطبيق سطح مكتب',
      order: 3,
      isFeatured: false,
      titleEn: 'BARX',
      titleAr: 'BARX',
      subtitleEn: 'Gym Cafeteria & Bar Operations Desktop Management System',
      subtitleAr: 'نظام ديسكتوب متكامل لإدارة كافتيريا وبار الجيم بدون إنترنت',
      descriptionEn: 'BARX is a high-speed desktop software designed specifically for gym cafeterias, supplement bars, and fitness snack counters. Built with React and Electron, it functions seamlessly offline without internet dependencies.',
      descriptionAr: 'BARX هو برنامج ديسكتوب سريع مخصص لإدارة الكافتيريا أو البار الخاص بالجيم. تم بناؤه باستخدام React و Electron ليعمل بشكل Offline بالكامل دون الحاجة لاتصال بالإنترنت.',
      problemEn: 'Gym cafeteria bars experience severe internet dropouts in basement facilities, causing sales delays, untracked cash transactions, and inventory discrepancies.',
      problemAr: 'تعاني كافتيريات الجيم وصالات اللياقة من انقطاع الإنترنت المتكرر مما يعطل عمليات البيع ويسبب فاقدًا في الجرد وتسجيل المبيعات اليدوي.',
      solutionEn: 'Engineered an offline-first desktop POS and inventory system with local SQLite/IndexedDB syncing, thermal receipt generation, quick-tap product grid, and daily shift revenue summaries.',
      solutionAr: 'تصميم تطبيق ديسكتوب يعمل بالكامل دون اتصال، مع نقطة بيع POS لمسية فائقة السرعة، وخصم تلقائي للمخزون، وتقارير إغلاق الوردية ومطابقة النقدية.',
      featuresEn: [
        '100% offline capability with automated background sync',
        'Quick-touch point-of-sale interface tailored for high-volume counter shifts',
        'Real-time drink & supplement ingredient stock deduction',
        'Comprehensive shift closeout reports with gross margins and cash balancing'
      ],
      featuresAr: [
        'يعمل 100% بدون إنترنت (Offline-First) مع حفظ محلي آمن',
        'واجهة POS لمسية سريعة جداً مناسبة لأوقات الذروة والطلبات المستمرة',
        'متابعة وجرد مخزون المشروبات والمكملات والوجبات الرياضية',
        'تقارير مفصلة لكل وردية تشمل المبيعات والأرباح ورصيد الدرج'
      ],
      technologies: ['Electron', 'React', 'TypeScript', 'Tailwind CSS', 'Offline DB'],
      liveUrl: null,
      githubUrl: 'https://github.com/adhm-dell',
      coverImageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200&auto=format&fit=crop',
      year: 2024,
    }
  });

  await prisma.projectMedia.createMany({
    data: [
      { projectId: p3.id, type: MediaType.IMAGE, url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200&auto=format&fit=crop', titleEn: 'BARX POS', tagEn: 'POS Screen', tagAr: 'شاشة البيع', order: 1 },
      { projectId: p3.id, type: MediaType.YOUTUBE, url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', titleEn: 'BARX Offline Sales Demo', durationLabel: '04:40', order: 2 },
    ]
  });

  const p4 = await prisma.project.create({
    data: {
      slug: 'mefit',
      category: 'desktop',
      badgeEn: 'Inventory Desktop Software',
      badgeAr: 'نظام إدارة المخزون',
      order: 4,
      isFeatured: false,
      titleEn: 'MEFIT',
      titleAr: 'MEFIT',
      subtitleEn: 'Clothing Brand & Apparel Retail Inventory Desktop System',
      subtitleAr: 'نظام ديسكتوب لإدارة المخزون والمبيعات للبراندات ومحلات الملابس',
      descriptionEn: 'MEFIT is a specialized desktop application built for apparel brands and retail stores to govern multi-variant inventories (sizes, colors, fabrics) and generate streamlined sales records.',
      descriptionAr: 'MEFIT هو نظام Desktop لإدارة المخزون مصمم خصيصًا للبراندات ومحلات الملابس الرياضية والكاجوال، يساعد على التحكم الدقيق في المقاسات والألوان والمبيعات.',
      problemEn: 'Clothing labels often mishandle inventory across varied size/color matrices, resulting in overselling or unaccounted storage shrinkage.',
      problemAr: 'صعوبة إدارة مخزون الملابس بسبب تعدد المتغيرات (المقاسات، الألوان، الموديلات) مما يؤدي إلى أخطاء في الجرد وعجز في المبيعات.',
      solutionEn: 'Engineered a specialized SKU matrix system in Electron + React, offering barcode scanner integration, stock alerts, supplier invoice logging, and return tracking.',
      solutionAr: 'تطوير تطبيق ديسكتوب متكامل بنظام مصفوفة الأصناف (SKU Matrix)، يدعم قراءة الباركود، تنبيهات النواقص، وإدارة فواتير الموردين والمرتجعات.',
      featuresEn: [
        'Multi-attribute inventory tracking (Size, Color, Batch, Fit)',
        'Barcode scanning support for rapid checkout and stock audits',
        'Automated minimum stock alerts and supplier replenishment triggers',
        'Local-first resilience guaranteeing zero downtime during store hours'
      ],
      featuresAr: [
        'إدارة متقدمة للمقاسات والألوان والموديلات ومواقع التخزين',
        'دعم كامل لقارئ الباركود (Barcode Scanners) لسرعة الجرد والبيع',
        'تنبيهات فورية عند وصول أي صنف للحد الأدنى من المخزون',
        'يعمل بدون توقف ومستقر داخل فروع ومتاجر الملابس'
      ],
      technologies: ['Electron', 'React', 'TypeScript', 'Zod', 'Tailwind CSS'],
      liveUrl: null,
      githubUrl: 'https://github.com/adhm-dell',
      coverImageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop',
      year: 2024,
    }
  });

  await prisma.projectMedia.createMany({
    data: [
      { projectId: p4.id, type: MediaType.IMAGE, url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop', titleEn: 'SKU Matrix', tagEn: 'SKU Matrix', tagAr: 'نظام المنتجات', order: 1 },
    ]
  });

  const p5 = await prisma.project.create({
    data: {
      slug: 'upicplast',
      category: 'web',
      badgeEn: 'Enterprise Business Web',
      badgeAr: 'موقع شركة مؤسسية',
      order: 5,
      isFeatured: false,
      titleEn: 'UPICPLAST',
      titleAr: 'UPICPLAST',
      subtitleEn: 'Corporate Industrial Presence & B2B Product Showcase',
      subtitleAr: 'موقع وتطبيق ويب رسمي لشركة صناعية وتجارية رائدة',
      descriptionEn: 'UPICPLAST represents production-grade business engineering: a high-performance, SEO-optimized B2B website built to present manufacturing capabilities, product catalogs, and corporate credentials.',
      descriptionAr: 'UPICPLAST يمثل خبرتي العملية في بناء مواقع أعمال وشركات متكاملة وعالية الأداء، تبرز خطوط الإنتاج والكتالوجات الصناعية وطلبات عروض الأسعار.',
      problemEn: 'Industrial manufacturers often have outdated websites that look unverified on mobile, load sluggishly, and fail to generate qualified international inquiries.',
      problemAr: 'المواقع التقليدية للمصانع تفتقد التجاوب مع الموبايل وتعاني من بطء التحميل وضعف الظهور في محركات البحث.',
      solutionEn: 'Constructed an ultra-fast, responsive web portal with structured industrial schemas, multilingual readiness, and dynamic quotation forms.',
      solutionAr: 'تطوير موقع عصري متجاوب بنسبة 100% مع تحسينات SEO متقدمة ونظام طلب عروض أسعار تفاعلي للمنتجات البلاستيكية والصناعية.',
      featuresEn: [
        'Fully responsive layout optimized across 4K displays down to budget mobile handsets',
        'SEO-first architecture with structured microdata for industrial manufacturing',
        'Interactive quotation request engine with file specification uploads',
        'Rigorous sub-second load times achieved via asset optimization and edge CDN'
      ],
      featuresAr: [
        'تصميم متجاوب وسريع جداً على شاشات Desktop والتابلت والهواتف',
        'بنية متوافقة مع معايير محركات البحث (SEO) لزيادة التواصل التجاري B2B',
        'نماذج تفاعلية لطلب عروض الأسعار والمواصفات الفنية',
        'أداء سريع وتجربة تصفح عصرية تعكس الاحترافية المؤسسية'
      ],
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'SEO'],
      liveUrl: 'https://upicplast.com',
      githubUrl: 'https://github.com/adhm-dell',
      coverImageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop',
      year: 2023,
    }
  });

  await prisma.projectMedia.createMany({
    data: [
      { projectId: p5.id, type: MediaType.IMAGE, url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop', titleEn: 'Homepage', tagEn: 'Homepage', tagAr: 'الرئيسية', order: 1 },
    ]
  });

  const p6 = await prisma.project.create({
    data: {
      slug: 'gymsystem',
      category: 'saas',
      badgeEn: 'Enterprise Backend System',
      badgeAr: 'نظام إدارة شامل',
      order: 6,
      isFeatured: false,
      titleEn: 'GYM MANAGEMENT SYSTEM',
      titleAr: 'نظام إدارة الجيم المتكامل',
      subtitleEn: 'Type-Safe Distributed Architecture for Enterprise Fitness Facilities',
      subtitleAr: 'نظام Backend عالي السرعة Type-Safe لإدارة الاشتراكات والموظفين والصالات',
      descriptionEn: 'A comprehensive software architecture concept engineered with ElysiaJS and Drizzle ORM, covering member check-ins, barcode verification, employee geofencing attendance, InBody analytics, and sauna allocations.',
      descriptionAr: 'نظام متقدم لإدارة صالات الجيم مبني باستخدام ElysiaJS و Drizzle ORM و PostgreSQL، يغطي تسجيل الحضور بالباركود، تتبع حضور الموظفين بالـ Geofencing، وجلسات InBody والسونا.',
      problemEn: 'Large gyms experience bottleneck queues at reception, unverified check-ins, and fragmented tracking of facility amenities like sauna and InBody scans.',
      problemAr: 'الازدحام الشديد على الاستقبال وصعوبة التحقق من صحة الاشتراكات وتتبع رصيد الخدمات الإضافية للمتدربين.',
      solutionEn: 'Architected high-throughput type-safe backend endpoints via Eden Treaty and PostgreSQL, enabling rapid barcode/phone lookups, staff geofencing, and member entitlement balances.',
      solutionAr: 'هندسة معمارية سريعة جداً و Type-Safe تضمن سرعة التحقق من العضوية عبر الباركود أو رقم الهاتف في أجزاء من الثانية مع حماية الصلاحيات.',
      featuresEn: [
        'Ultra-fast member lookup via phone or barcode scanning',
        'Staff attendance tracking with coordinate-based geofencing verification',
        'InBody & sauna service entitlement balances with automatic deductions',
        'Complete end-to-end type safety between server and client via Eden Treaty'
      ],
      featuresAr: [
        'تسجيل دخول لحظي للأعضاء عبر الباركود أو الهاتف (Barcode & Phone Check-In)',
        'تتبع حضور الموظفين مع التحقق من الموقع الجغرافي (Staff Geofencing)',
        'إدارة جلسات الـ InBody والسونا واشتراكات الخدمات الملحقة',
        'أمان ونقاء كودي عالي مع معمارية ElysiaJS و Drizzle ORM'
      ],
      technologies: ['ElysiaJS', 'Drizzle ORM', 'PostgreSQL', 'Eden Treaty'],
      liveUrl: null,
      githubUrl: 'https://github.com/adhm-dell',
      coverImageUrl: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1200&auto=format&fit=crop',
      year: 2023,
    }
  });

  await prisma.projectMedia.createMany({
    data: [
      { projectId: p6.id, type: MediaType.IMAGE, url: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1200&auto=format&fit=crop', titleEn: 'Reception', tagEn: 'Reception', tagAr: 'الاستقبال', order: 1 },
    ]
  });

  // 7. Hero Settings
  await prisma.heroSettings.deleteMany();
  await prisma.heroSettings.create({
    data: {
      terminalCodeEn: `const engineer = {
  name: 'Adham Salah',
  degree: 'CS & IT Helwan (2026)',
  stack: ['React 19', 'NestJS', 'Postgres'],
  capabilities: ['Real-time', 'AI/LLM', 'Desktop'],
  flagshipProduct: 'FR3ON FIT Ecosystem'
};`,
      terminalCodeAr: `const engineer = {
  name: 'أدهم صلاح',
  degree: 'حاسبات ومعلومات حلوان (2026)',
  stack: ['React 19', 'NestJS', 'Postgres'],
  capabilities: ['Real-time', 'AI/LLM', 'Desktop'],
  flagshipProduct: 'FR3ON FIT Ecosystem'
};`,
      projectTitleEn: 'FR3ON FIT',
      projectTitleAr: 'فرعون فيت',
      projectDescEn: 'Complete fitness SaaS uniting coaches & athletes with automated AI workout/nutrition engines and real-time messaging.',
      projectDescAr: 'منصة رياضية متكاملة لربط الكباتن بالمتدربين مع توليد أنظمة بالذكاء الاصطناعي.',
      projectTagsEn: ['React', 'NextJS', 'OpenRouter AI', 'Socket.io'],
      projectTagsAr: ['React', 'NextJS', 'OpenRouter AI', 'Socket.io'],
      projectLink: '/project/fr3onfit'
    }
  });

  // 8. About Features
  await prisma.aboutFeature.deleteMany();
  await prisma.aboutFeature.createMany({
    data: [
      {
        titleEn: 'Architectural Depth',
        titleAr: 'عمق معماري',
        descriptionEn: 'Designing relational schemas, service-layer patterns, role authorization, and low-latency database queries before writing UI code.',
        descriptionAr: 'تصميم قواعد البيانات، أنظمة الصلاحيات، واستعلامات سريعة قبل كتابة الكود.',
        iconColor: 'bg-sky-900/60',
        order: 1
      },
      {
        titleEn: 'Production Infrastructure',
        titleAr: 'بنية تحتية قوية',
        descriptionEn: 'Linux VPS management, Docker containers, Nginx reverse proxy, CI/CD automated deployment, and automated backup pipelines.',
        descriptionAr: 'إدارة سيرفرات لينكس، حاويات دوكر، والنشر التلقائي المستمر.',
        iconColor: 'bg-emerald-900/60',
        order: 2
      }
    ]
  });

  // 9. Philosophy Cards
  await prisma.philosophyCard.deleteMany();
  await prisma.philosophyCard.createMany({
    data: [
      {
        categoryEn: 'ARCHITECTURE', categoryAr: 'المعمارية',
        titleEn: 'Separation of Concerns', titleAr: 'فصل المسؤوليات',
        descriptionEn: 'Strict isolation between controllers, services, repositories, and presentation components to keep codebases testable and clean.',
        descriptionAr: 'فصل تام بين طبقات التطبيق للحفاظ على كود نظيف وقابل للاختبار.',
        color: 'text-emerald-400', order: 1
      },
      {
        categoryEn: 'TYPE SAFETY', categoryAr: 'أمان الأنواع',
        titleEn: 'End-to-End Type Rigor', titleAr: 'صرامة الأنواع الشاملة',
        descriptionEn: 'From database schemas (Prisma) up through API validation (Zod) and frontend clients, eliminating runtime contract mismatches.',
        descriptionAr: 'حماية الأنواع من قاعدة البيانات وحتى الواجهات لمنع أخطاء وقت التشغيل.',
        color: 'text-sky-400', order: 2
      },
      {
        categoryEn: 'PERFORMANCE', categoryAr: 'الأداء',
        titleEn: 'Latency & Data Efficiency', titleAr: 'كفاءة البيانات',
        descriptionEn: 'Leveraging memory caching, indexed queries, optimistic UI updates, and lightweight payloads for instant responsiveness.',
        descriptionAr: 'استخدام التخزين المؤقت وتحديثات الواجهة المتفائلة لسرعة استجابة فورية.',
        color: 'text-amber-400', order: 3
      },
      {
        categoryEn: 'RELIABILITY', categoryAr: 'الموثوقية',
        titleEn: 'Production Readiness', titleAr: 'الجاهزية للإنتاج',
        descriptionEn: 'Automated SSH deploys, database backup schedules, SSL enforcement, and container health checks ensure smooth live operations.',
        descriptionAr: 'نشر تلقائي، نسخ احتياطي، وفحوصات صحة النظام لضمان استقرار العمليات.',
        color: 'text-emerald-400', order: 4
      }
    ]
  });

  console.log('Database seeded successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
