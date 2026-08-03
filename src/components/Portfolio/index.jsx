import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const Portfolio = () => {
  const { t } = useLanguage();

  return (
    <section className="py-stack-lg px-margin-mobile md:px-margin-desktop bg-[#0d0c11] relative" id="portfolio" data-motion-section>
      <div className="max-w-container-max mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-stack-lg" data-motion-item>
          <div className="flex items-center gap-6 mb-4">
            <div className="h-px w-12 bg-[#d0bcff]/20" />
            <span className="font-label-caps text-label-caps text-[#d0bcff]/70 tracking-[0.2em] uppercase">
              {t('portfolio.stage.kicker') || 'SELECTED WORK'}
            </span>
            <div className="h-px w-12 bg-[#d0bcff]/20" />
          </div>
          <h2 className="font-headline-lg text-headline-lg md:text-[64px] text-[#ece9f1] tracking-tighter font-bold">
            {t('portfolio.stage.title') || '实践案例'}
          </h2>
          <p className="portfolio-stage-intro text-[#a39fb0] opacity-80 mt-3 max-w-xl mx-auto text-body-md">
            {t('portfolio.stage.intro') || '三个复杂系统案例，展示我如何把流程、规则与协作重组为可执行产品。'}
          </p>
        </div>

        {/* Project Cards - Vertically stacked, alternating left/right layout */}
        <div className="portfolio-stage-grid flex flex-col gap-12" data-motion-group="portfolio-stage">
          {/* Project 01: Image LEFT, Text RIGHT */}
          <Link
            to="/project/member-automation"
            className="w-full bg-[#16151c] border border-[#2a2833] rounded-[16px] p-6 md:p-8 flex flex-col md:flex-row gap-8 md:gap-12 hover:-translate-y-0.5 hover:border-[#d0bcff]/40 transition-all duration-300 no-underline group text-inherit items-center"
            data-motion-item
            data-motion-hover="card"
          >
            <div className="w-full md:w-1/2 aspect-video rounded-[12px] overflow-hidden bg-white/5 md:p-6 flex items-center justify-center border border-[#2a2833]">
              <img
                alt="会员自动化与服务衔接"
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBql5MGzlEPwA81mrFePT8D-bgBrFaqLbWe3xNeIyEYBVn-lz6ZisoBrGmU7o3vJ1EQ_p8k0zS3xb0B1Ay-Ng3n8IoviPvIUODkMGbE3VM8i_EpIL2C1LMdWd0eiXcrJozT8IofGZ4lUybXKUoF4sVsYeDPy0njO972NVzXS82kQ45ljjRugmrE4Vvt6A7fQJ8TiNwNVPzB3igl3arySmTfqpipmfJfLbkMfIqBGSf15bgagw0npqQXDlT5AZksO3YbYsg"
              />
            </div>
            <div className="flex-1 flex flex-col justify-between space-y-4 w-full">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="font-label-caps text-label-caps text-[#d0bcff] uppercase tracking-widest">
                    MEMBER AUTOMATION
                  </span>
                  <span className="font-label-caps text-label-caps text-[#a39fb0]/60 uppercase tracking-widest flex items-center gap-1">
                    <span>•</span>
                    <span>规则系统重构</span>
                  </span>
                  <span className="font-label-caps text-label-caps text-[#a39fb0]/40 uppercase tracking-widest ml-auto">
                    RULE SYSTEM
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-[#ece9f1] font-semibold group-hover:text-[#d0bcff] transition-colors">
                  会员自动化与服务衔接
                </h3>
                <p className="text-body-md text-[#a39fb0] leading-relaxed">
                  打通会员卡、卡券、收费与账单，实现高频收银流程自动化与财务合规治理。
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-[#2a2833] pt-4">
                <div className="flex flex-col">
                  <span className="text-headline-md font-bold text-[#d0bcff]">~1 分钟</span>
                  <span className="font-label-caps text-label-caps text-[#a39fb0] mt-1">门店操作耗时</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-headline-md font-bold text-[#d0bcff]">1 天</span>
                  <span className="font-label-caps text-label-caps text-[#a39fb0] mt-1">财务月底对账</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-headline-md font-bold text-[#d0bcff]">20+</span>
                  <span className="font-label-caps text-label-caps text-[#a39fb0] mt-1">落地覆盖门店</span>
                </div>
              </div>
              <span className="sr-only">VIEW CASE ↗</span>
            </div>
          </Link>

          {/* Project 02: Text LEFT, Image RIGHT */}
          <Link
            to="/project/orthodontics"
            className="w-full bg-[#16151c] border border-[#2a2833] rounded-[16px] p-6 md:p-8 flex flex-col md:flex-row-reverse gap-8 md:gap-12 hover:-translate-y-0.5 hover:border-[#b9f2c8]/40 transition-all duration-300 no-underline group text-inherit items-center"
            data-motion-item
            data-motion-hover="card"
          >
            <div className="w-full md:w-1/2 aspect-video rounded-[12px] overflow-hidden bg-[#50C878]/20 md:p-6 flex items-center justify-center border border-[#2a2833]">
              <div className="w-full h-full bg-[#50C878]/40 rounded-xl" />
            </div>
            <div className="flex-1 flex flex-col justify-between space-y-4 w-full">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="font-label-caps text-label-caps text-[#b9f2c8] uppercase tracking-widest">
                    ORTHO FUNNEL
                  </span>
                  <span className="font-label-caps text-label-caps text-[#a39fb0]/60 uppercase tracking-widest flex items-center gap-1">
                    <span>•</span>
                    <span>漏斗与角色协作</span>
                  </span>
                  <span className="font-label-caps text-label-caps text-[#a39fb0]/40 uppercase tracking-widest ml-auto">
                    FLOW REBUILD
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-[#ece9f1] font-semibold group-hover:text-[#b9f2c8] transition-colors">
                  正畸筛查与状态管理
                </h3>
                <p className="text-body-md text-[#a39fb0] leading-relaxed">
                  重构儿牙与正畸医生协作流程，建立从推荐到预约的可追踪状态机漏斗。
                </p>
              </div>
              <div className="border-t border-[#2a2833] pt-4">
                <div className="flex flex-col">
                  <span className="font-bold text-[#b9f2c8] leading-none text-headline-md">50-60%</span>
                  <span className="font-label-caps text-label-caps text-[#a39fb0] mt-2">矫正转化率 (原 30-40%)</span>
                </div>
              </div>
              <span className="sr-only">VIEW CASE ↗</span>
            </div>
          </Link>

          {/* Project 03: Image LEFT, Text RIGHT */}
          <Link
            to="/project/pacs-ai"
            className="w-full bg-[#16151c] border border-[#2a2833] rounded-[16px] p-6 md:p-8 flex flex-col md:flex-row gap-8 md:gap-12 hover:-translate-y-0.5 hover:border-[#d0bcff]/40 transition-all duration-300 no-underline group text-inherit items-center"
            data-motion-item
            data-motion-hover="card"
          >
            <div className="w-full md:w-1/2 aspect-video rounded-[12px] overflow-hidden bg-[#d0bcff]/15 p-4 md:p-6 flex items-center justify-center border border-[#2a2833]">
              <img
                alt="PACS 读片与 AI 辅助判断"
                className="w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWDQde1uEk6oLlZMWO790kTJZhPkra7ok2Vip0IU8rGQYXNvpGZZcLqbrkoBYl55Yh_12k2YYPKS7txGfjqcX-jMwqkqWVMEoyNdLhzVqJOxEfWsK7gtwKoyWic7EeYIjuzdFUUlqdWZTwa1HtgcZPNvEQoaiGyS4OiqyMsD1jV-Qoh-LPhFEnWhhPjhbcon2m9oDfsPA1_Gi7eZawVLfDCLaaXjqGJzzuEdjn_aFq_thSpXgMipOto-rCp2Nh-hJR26o"
              />
            </div>
            <div className="flex-1 flex flex-col justify-between space-y-4 w-full">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="font-label-caps text-label-caps text-[#d0bcff] uppercase tracking-widest">
                    AI REVIEW LOOP
                  </span>
                  <span className="font-label-caps text-label-caps text-[#a39fb0]/60 uppercase tracking-widest flex items-center gap-1">
                    <span>•</span>
                    <span>人机协作闭环</span>
                  </span>
                  <span className="font-label-caps text-label-caps text-[#a39fb0]/40 uppercase tracking-widest ml-auto">
                    HUMAN + AI
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-[#ece9f1] font-semibold group-hover:text-[#d0bcff] transition-colors">
                  PACS 读片与 AI 辅助判断
                </h3>
                <p className="text-body-md text-[#a39fb0] leading-relaxed">
                  构建影像读片结构化留痕与 AI 人机协作闭环，形成算法与医生复核的数据飞轮。
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-[#2a2833] pt-4">
                <div className="flex flex-col">
                  <span className="text-headline-md font-bold text-[#d0bcff]">3.46 颗</span>
                  <span className="font-label-caps text-label-caps text-[#a39fb0] mt-1">均单龋齿检出</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-headline-md font-bold text-[#d0bcff]">+140%</span>
                  <span className="font-label-caps text-label-caps text-[#a39fb0] mt-1">检出率提升</span>
                </div>
              </div>
              <span className="sr-only">VIEW CASE ↗</span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
