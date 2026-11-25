import { readFileSync } from "node:fs";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { vi } from "vitest";
import { LanguageProvider } from "../../context/LanguageContext";
import ProjectDetail from "./index";

vi.mock("gsap", () => ({
  default: {
    context: (callback) => {
      callback();
      return { revert() {} };
    },
    fromTo: vi.fn(),
    set: vi.fn(),
  },
}));

const renderProjectDetail = (initialEntry) =>
  render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <LanguageProvider>
        <Routes>
          <Route path="/project/:id" element={<ProjectDetail />} />
        </Routes>
      </LanguageProvider>
    </MemoryRouter>,
  );

test("orthodontics routes to the approved shared-record case and capability permissions", () => {
  renderProjectDetail("/project/orthodontics");
  const flow = screen.getByRole("figure", { name: "角色接续示意" });
  ["护士", "儿牙医生", "具备专业权限的医生"].forEach((role) =>
    expect(flow).toHaveTextContent(role),
  );
  expect(flow).toHaveTextContent("资料采集");
  expect(flow).toHaveTextContent("正式结论");
  expect(
    screen.getByText("不同角色使用各自账号，接续完成同一份筛查记录。"),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("table", { name: "岗位角色与专业等级权限" }),
  ).toHaveTextContent("可选预填写结论");
});

test("PACS routes to the approved final Figma case with seven decisions and actual evidence", () => {
  const { container } = renderProjectDetail("/project/pacs-ai");
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "PACS 影像读片与 AI 辅助",
  );
  expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(7);
  expect(container.querySelector("#case-cover img")).toBeNull();
  expect(container.querySelectorAll("main img")).toHaveLength(2);
  expect(container).not.toHaveTextContent(
    /素材准备中|编辑备注与资料来源|数据飞轮/,
  );
  expect(container.querySelector("#results")).toHaveTextContent(
    "并非识别准确率",
  );
});

test("global typography defines distinct display, body, serif, and mono roles", () => {
  const variables = readFileSync("src/styles/variables.css", "utf8");
  for (const role of ["display", "body", "serif", "mono"]) {
    expect(variables).toMatch(new RegExp(`--font-${role}:\\s*[^;]+;`));
  }
});

test("orthodontics presents the verified rollout, ownership, iteration decision, and comparison scope", () => {
  renderProjectDetail("/project/orthodontics");

  expect(screen.getByText("全国门店推广")).toBeInTheDocument();
  expect(screen.getAllByText(/全国/).length).toBeGreaterThan(0);
  expect(
    screen.getByText(/核心职责：业务调研、产品规划、规则与流程设计/),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", {
      name: "如何确定优先处理的任务？",
    }),
  ).toBeInTheDocument();
  expect(screen.getByText("2025 年 2—4 月")).toBeInTheDocument();
  expect(screen.getByText("54,990")).toBeInTheDocument();
  expect(screen.getAllByText(/18,460/).length).toBeGreaterThan(0);
  expect(screen.queryByText(/独立完成门诊调研/)).not.toBeInTheDocument();
});

test("member automation follows confirmed rules and explains manual failure handling without rollback claims", () => {
  const { container } = renderProjectDetail("/project/member-automation");

  expect(screen.getByText(/在用卡有效期及待开通卡状态/)).toBeInTheDocument();
  expect(screen.getByText(/前后未做统一计时/)).toBeInTheDocument();
  expect(screen.getByText(/原账单已找到、退费已完成/)).toBeInTheDocument();
  expect(container).not.toHaveTextContent(/门店现场实测|日终批处理/);
  expect(container).not.toHaveTextContent(/原子|回退|保留原卡与原权益|约 3 天/);
});

test("pre-visit engine renders panoramic views, tooth quadrant ergonomics and structured task bundles", () => {
  renderProjectDetail("/project/pre-visit-engine");

  expect(screen.getByText(/接诊全流程预习与任务编排引擎/)).toBeInTheDocument();
  expect(screen.getAllByText(/打通孤岛系统/).length).toBeGreaterThan(0);
  expect(screen.getByText(/结构化任务包分层模型/)).toBeInTheDocument();
  expect(screen.getByText(/十字象限牙位选择控件/)).toBeInTheDocument();
  expect(screen.getByText(/复盘反思与未解局限/)).toBeInTheDocument();
});

// 保留启用开关后的英文恢复路径测试；生产默认停用英文。
vi.mock("../../config/features", () => ({ ENGLISH_ENABLED: true }));
