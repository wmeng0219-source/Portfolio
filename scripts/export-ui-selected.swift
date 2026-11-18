import AppKit
import PDFKit
import ImageIO
import UniformTypeIdentifiers

let root = FileManager.default.currentDirectoryPath + "/"
let out = root + "output/pdf/温萌_UI作品精选.pdf"
try FileManager.default.createDirectory(atPath: root + "output/pdf", withIntermediateDirectories: true)
try FileManager.default.createDirectory(atPath: "/tmp/portfolio-unified-preview", withIntermediateDirectories: true)
struct Page {
 let group: String; let title: String; let desc: String; let role: String
 let path: String
}
let pages: [Page] = [
 Page(group:"01 / 正畸筛查",title:"让筛查任务与处理进度一目了然",desc:"区分已预约任务与系统推荐，在列表中集中呈现问诊、资料采集和影像分析的完成情况。",role:"我的工作：调研、流程与协作规则、交互及 UI 设计",path:"docs/origin/咬合筛查/截图/儿牙筛查列表@2x.png"),
 Page(group:"01 / 正畸筛查",title:"把影像查看、判断与沟通放在同一页",desc:"左侧保留患者背景，中间查看口扫模型，右侧完成检查项选择，并提供科普入口辅助讲解。",role:"我的工作：产品方案、交互及 UI 设计",path:"docs/origin/咬合筛查/截图/影像分析页面-口扫@2x.png"),
 Page(group:"01 / 正畸筛查",title:"交接前确认沟通信息与接续医生",desc:"完成筛查时补充家长意愿、决策人和特殊情况，并明确将由哪位医生继续下结论。",role:"我的工作：流程、交互及 UI 设计",path:"docs/origin/咬合筛查/截图/儿牙完成筛查确认信息@2x.png"),
 Page(group:"01 / 正畸筛查",title:"将专业结论落实到后续行动",desc:"在结论区组织治疗必要性、正畸医生和行动计划，让下一位接手者看清评估结果与安排。",role:"我的工作：协作规则、交互及 UI 设计 · 界面局部",path:"docs/origin/咬合筛查/截图/三级下结论@2x.png"),
 Page(group:"02 / 会员自动化",title:"集中呈现当前会员、卡券与权益",desc:"将分散的会员信息组织到办理工作台，支持前台核对患者现状，再进入开卡、升级或续卡。",role:"我的工作：调研、业务规则、产品方案、交互及 UI 设计",path:"public/images/member/workspace-full.jpg"),
 Page(group:"02 / 会员自动化",title:"选卡时同步核对权益与应付费用",desc:"在一个窗口内关联目标卡、权益、优惠和最终金额，支持前台边选择边核对，并向家长解释。",role:"我的工作：产品方案、交互及 UI 设计",path:"public/images/member/upgrade-full.jpg"),
 Page(group:"03 / PACS 读片与 AI 辅助",title:"让 AI 提示与医生复核紧邻影像",desc:"影像标记与右侧提示卡对应，医生可确认、选择不写入或否决结果；最终诊断由医生负责。",role:"我的工作：AI 辅助方案、复核规则、交互及 UI 设计；算法由算法同事负责",path:"docs/origin/读片/截图/AI识别病灶@2x.png"),
 Page(group:"03 / PACS 读片与 AI 辅助",title:"围绕标记位置完成结构化记录",desc:"在影像旁选择牙位、填写判断并复用已有描述，将影像查看与记录填写连接起来。",role:"我的工作：流程交互与 UI 设计；基础读片与产品经理共同推进",path:"docs/origin/读片/截图/AI识别病灶-复用@2x.png")
]

// Design scope: this fixed-size PDF only. Website tokens remain in DESIGN.md.
enum PDFDesign {
 static let width: CGFloat = 1280, height: CGFloat = 1000
 static let margin: CGFloat = 56, contentWidth: CGFloat = 1168
 static let gap: CGFloat = 24, mediaPadding: CGFloat = 16, radius: CGFloat = 24
 enum TypeSize {
  static let project: CGFloat = 48, heading: CGFloat = 36
  static let body: CGFloat = 18, meta: CGFloat = 16, small: CGFloat = 14
 }
 static func leading(_ size: CGFloat) -> CGFloat {
  switch size {
  case TypeSize.project: return 58
  case TypeSize.heading: return 44
  case TypeSize.body: return 27
  case TypeSize.meta: return 24
  case TypeSize.small: return 21
  default: fatalError("Unregistered font size: \(size)")
  }
 }
}
let W = PDFDesign.width, H = PDFDesign.height
var activePage=0
var textAudit: [[String:Any]]=[]
var imageAudit: [[String:Any]]=[]
var navAudit: [[String:Any]]=[]

func col(_ hex:UInt32)->NSColor { NSColor(calibratedRed:CGFloat((hex>>16)&255)/255,green:CGFloat((hex>>8)&255)/255,blue:CGFloat(hex&255)/255,alpha:1) }
let mediaFill=col(0xDED5E6)
let ink=col(0x392243), muted=col(0x6B5F73), accent=col(0x68417D), lilac=col(0xEFE2F4), pale=col(0xFAF7FC), line=col(0xE5DAEA)
func box(_ r:CGRect,_ color:NSColor,_ radius:CGFloat=0,_ border:NSColor?=nil) {
 let path=NSBezierPath(roundedRect:r,xRadius:radius,yRadius:radius)
 color.setFill();path.fill()
 if let b=border { b.setStroke();path.lineWidth=1;path.stroke() }
}
func text(_ s:String,_ r:CGRect,_ size:CGFloat,_ color:NSColor?=nil,_ weight:NSFont.Weight = .regular,_ alignment:NSTextAlignment = .left) {
 let lineHeight=PDFDesign.leading(size)
 let name=weight == .semibold ? "PingFangSC-Semibold" : (weight == .medium ? "PingFangSC-Medium" : "PingFangSC-Regular")
 guard let font=NSFont(name:name,size:size) else {fatalError("Required font missing: \(name)")}
 let p=NSMutableParagraphStyle();p.minimumLineHeight=lineHeight;p.maximumLineHeight=lineHeight;p.alignment=alignment
 let attrs:[NSAttributedString.Key:Any]=[.font:font,.foregroundColor:color ?? ink,.paragraphStyle:p]
 let bounds=(s as NSString).boundingRect(with:NSSize(width:r.width,height:10000),options:[.usesLineFragmentOrigin,.usesFontLeading],attributes:attrs)
 precondition(bounds.height <= r.height+1,"Text overflow p\(activePage): \(s), measured \(bounds.height), available \(r.height)")
 precondition(r.minX >= PDFDesign.margin && r.maxX <= W-PDFDesign.margin+1,"Text outside horizontal grid: \(s)")
 precondition(r.minY >= 0 && r.maxY <= H,"Text outside page")
 textAudit.append(["page":activePage,"text":s,"font":name,"size":size,"leading":lineHeight,"x":r.minX,"y":r.minY,"width":r.width,"height":r.height,"measuredHeight":bounds.height,"alignment":alignment == .right ? "right" : (alignment == .center ? "center" : "left")])
 (s as NSString).draw(in:r,withAttributes:attrs)
}
func source(_ page:Page)->NSImage {
 return NSImage(contentsOfFile:root+page.path)!
}

var media=CGRect(x:0,y:0,width:W,height:H)
let consumer=CGDataConsumer(url:URL(fileURLWithPath:out) as CFURL)!
let ctx=CGContext(consumer:consumer,mediaBox:&media,[kCGPDFContextTitle as String:"温萌 | UI 作品精选",kCGPDFContextAuthor as String:"温萌"] as CFDictionary)!
let total=9
func start(_ n:Int,_ group:Int,_ opener:Bool) {
 activePage=n
 ctx.beginPDFPage(nil);ctx.saveGState();ctx.translateBy(x:0,y:H);ctx.scaleBy(x:1,y:-1)
 NSGraphicsContext.saveGraphicsState();NSGraphicsContext.current=NSGraphicsContext(cgContext:ctx,flipped:true)
 box(CGRect(x:0,y:0,width:W,height:H),opener ? lilac : pale)
 if opener {
  let curve=NSBezierPath(ovalIn:CGRect(x:-290,y:-400,width:1130,height:720));col(0xE7D7EE).setStroke();curve.lineWidth=55;curve.stroke()
 }
 text("温萌",CGRect(x:56,y:24,width:64,height:32),PDFDesign.TypeSize.body,ink,.semibold)
 text("UI 作品精选",CGRect(x:128,y:27,width:250,height:24),PDFDesign.TypeSize.small,muted)
 let labels=["01 正畸筛查","02 会员自动化","03 PACS 读片"]
 let font=NSFont(name:"PingFangSC-Medium",size:PDFDesign.TypeSize.small)!
 let padding:CGFloat=12
 var cursor=W-PDFDesign.margin
 for k in stride(from:2,through:0,by:-1) {
  let selected=k==group
  let textWidth=ceil((labels[k] as NSString).size(withAttributes:[.font:font]).width)
  let width=textWidth+(selected ? 2*padding : 0)
  let r=CGRect(x:cursor-width,y:24,width:width,height:36)
  if selected {box(r,ink,18)}
  let textRect=CGRect(x:r.minX+(selected ? padding : 0),y:31,width:textWidth,height:24)
  text(labels[k],textRect,PDFDesign.TypeSize.small,selected ? .white : muted,.medium,.center)
  navAudit.append(["page":n,"label":labels[k],"selected":selected,"left":r.minX,"right":r.maxX,"textWidth":textWidth,"leftPadding":selected ? padding : 0,"rightPadding":selected ? padding : 0])
  cursor=r.minX-PDFDesign.gap
 }
 text("高保真 UI 设计 · 完整设计稿 · 展示数据为虚构",CGRect(x:56,y:960,width:900,height:24),PDFDesign.TypeSize.small,muted)
 text(String(format:"%02d / %02d",n,total),CGRect(x:1144,y:960,width:80,height:24),PDFDesign.TypeSize.small,muted,.medium,.right)
}
func end() { NSGraphicsContext.restoreGraphicsState();ctx.restoreGState();ctx.endPDFPage() }
func image(_ page:Page,_ rect:CGRect,_ padding:CGFloat=16) {
 let padding=PDFDesign.mediaPadding
 let img=source(page),s=min((rect.width-2*padding)/img.size.width,(rect.height-2*padding)/img.size.height)
 let r=CGRect(x:rect.midX-img.size.width*s/2,y:rect.midY-img.size.height*s/2,width:img.size.width*s,height:img.size.height*s)
 precondition(r.minX >= rect.minX && r.maxX <= rect.maxX+1 && r.minY >= rect.minY && r.maxY <= rect.maxY+1,"Image outside media container")
 imageAudit.append(["page":activePage,"path":page.path,"sourceWidth":img.size.width,"sourceHeight":img.size.height,"drawWidth":r.width,"drawHeight":r.height,"crop":false,"padding":padding])
 img.draw(in:r,from:.zero,operation:.sourceOver,fraction:1,respectFlipped:true,hints:[.interpolation:NSImageInterpolation.high])
}
struct Intro {let title:String;let promise:String;let users:String;let problem:String;let role:String;let imageIndex:Int;let caption:String}
let intros=[
 Intro(title:"正畸筛查",promise:"针对儿童正畸筛查中信息分散、医生交接和后续跟进不连贯的问题，重新设计从筛查推荐、资料采集、医生评估到预约跟进的完整流程，让不同岗位在同一套系统中协作，减少流程遗漏，提高患者转化效率。",users:"护士、儿牙医生、正畸医生与正畸顾问",problem:"原有功能零散，部分填写要求超出儿牙能力；资料与沟通分散，专业确认和后续跟进难以接续。",role:"门诊调研、流程与规则梳理、产品方案\n交互及 UI 设计",imageIndex:0,caption:"筛查任务列表  /  区分待执行任务与系统推荐，集中查看完成情况"),
 Intro(title:"会员自动化",promise:"为连锁儿童齿科设计会员办理系统，将原本需要跨多个模块查询、计算和操作的开卡、升级、续卡流程整合到一个工作台，由系统自动处理权益、差额和优惠计算。覆盖 20+ 门店，办理时间从 4–5 分钟缩短至约 1 分钟。",users:"承担接待、会员销售与收银的门店前台",problem:"升级时需跨模块查卡券和账单、计算补差，再分别处理费用与权益。",role:"一线调研、业务规则、产品方案\n交互及 UI 设计",imageIndex:4,caption:"会员办理工作台  /  先核对当前会员、卡券和权益，再进入办理"),
 Intro(title:"PACS 读片与 AI 辅助",promise:"为牙科医生设计影像读片工具，将影像标记、检查记录和病历同步整合到同一工作流程，并引入 AI 辅助识别龋齿等异常，由医生复核判断，帮助医生更方便地查看影像、记录诊断结果和向家长讲解。",users:"诊间读片与讲片的医生，以及医疗管理人员",problem:"讲片缺少与影像位置对应的记录，管理人员也难以跟进读片完成情况。",role:"基础读片交互与 UI；AI 阶段独立负责\n产品方案、规则、交互与 UI",imageIndex:6,caption:"AI 辅助读片工作台  /  对应影像标记与提示卡，医生可确认或否决")
]
func intro(_ n:Int,_ group:Int) {
 let d=intros[group];start(n,group,true)
 text(String(format:"项目 %02d / 03   ·   医疗业务系统",group+1),CGRect(x:56,y:96,width:640,height:24),PDFDesign.TypeSize.small,accent,.medium)
 text(String(format:"%02d · ",group+1)+d.title,CGRect(x:56,y:136,width:640,height:64),PDFDesign.TypeSize.project,ink,.semibold)
 text("项目背景",CGRect(x:56,y:216,width:640,height:24),PDFDesign.TypeSize.small,accent,.medium)
 text(d.promise,CGRect(x:56,y:248,width:640,height:108),PDFDesign.TypeSize.body,ink)
 let r=CGRect(x:720,y:88,width:504,height:264);box(r,col(0xF8F1FB),PDFDesign.radius)
 let labels=["使用者","原有问题","我的工作"]
 let values=[d.users,d.problem,d.role].map { $0.replacingOccurrences(of:"\n",with:"、") }
 let rows:[CGFloat]=[112,168,272]
 let heights:[CGFloat]=[48,80,56]
 for j in 0..<3 {
  text(labels[j],CGRect(x:744,y:rows[j],width:72,height:heights[j]),PDFDesign.TypeSize.meta,ink,.medium)
  text(values[j],CGRect(x:832,y:rows[j],width:368,height:heights[j]),PDFDesign.TypeSize.meta,ink)
 }
 let frame=CGRect(x:56,y:384,width:1168,height:528);box(frame,mediaFill,PDFDesign.radius);image(pages[d.imageIndex],frame)
 text(d.caption,CGRect(x:56,y:928,width:1168,height:24),PDFDesign.TypeSize.small,muted)
 end()
}
func detail(_ n:Int,_ group:Int,_ index:Int,_ note:String) {
 let p=pages[index];start(n,group,false)
 text(p.title,CGRect(x:56,y:96,width:1168,height:48),PDFDesign.TypeSize.heading,ink,.semibold)
 text(p.desc,CGRect(x:56,y:160,width:1168,height:56),PDFDesign.TypeSize.body,ink)
 let r=CGRect(x:56,y:240,width:1168,height:672);box(r,mediaFill,PDFDesign.radius);image(p,r)
 text(note,CGRect(x:56,y:928,width:1168,height:24),PDFDesign.TypeSize.small,muted)
 end()
}
intro(1,0)
detail(2,0,1,"影像分析页面 / 完整页面，保留导航、患者信息与操作区")
detail(3,0,2,"完成筛查确认 / 保留弹窗与所在页面的完整上下文")
detail(4,0,3,"正畸医生下结论 / 完整展示资料、检查内容与结论区")
start(5,0,false)
text("正畸筛查 · 页面合集",CGRect(x:56,y:96,width:1168,height:48),PDFDesign.TypeSize.heading,ink,.semibold)
text("从任务安排、影像分析，到筛查交接与专业结论。",CGRect(x:56,y:160,width:1168,height:56),PDFDesign.TypeSize.body,ink)
let galleryNames=["筛查任务列表","影像分析与口扫","完成筛查确认","正畸医生下结论"]
for i in 0..<4 {
 let x=CGFloat(56+(i%2)*596),y=CGFloat(240+(i/2)*348)
 let r=CGRect(x:x,y:y,width:572,height:324)
 box(r,mediaFill,PDFDesign.radius)
 text(galleryNames[i],CGRect(x:x+24,y:y+16,width:524,height:24),PDFDesign.TypeSize.meta,ink,.medium)
 image(pages[i],CGRect(x:x+8,y:y+48,width:556,height:268))
}
end()
intro(6,1)
detail(7,1,5,"升级选卡界面 / 保留办理弹窗与完整工作台背景")
intro(8,2)
detail(9,2,7,"结构化记录界面 / 保留顶部信息、影像工具栏及右侧记录区域")
ctx.closePDF()
let audit:[String:Any]=["pageCount":total,"typeSizes":Array(Set(textAudit.compactMap {$0["size"] as? CGFloat})).sorted(),"textBlocks":textAudit,"images":imageAudit,"navigation":navAudit]
try JSONSerialization.data(withJSONObject:audit,options:[.prettyPrinted,.sortedKeys]).write(to:URL(fileURLWithPath:"/tmp/portfolio-unified-audit.json"))
let doc=PDFDocument(url:URL(fileURLWithPath:out))!
for i in 0..<doc.pageCount {
 let thumb=doc.page(at:i)!.thumbnail(of:NSSize(width:1280,height:1000),for:.mediaBox)
 let rep=NSBitmapImageRep(data:thumb.tiffRepresentation!)!
 try rep.representation(using:.png,properties:[:])!.write(to:URL(fileURLWithPath:String(format:"/tmp/portfolio-unified-preview/page-%02d.png",i+1)))
}
print("Updated \(doc.pageCount) pages: \(out)")

// Optional export; PDF-only edits do not rewrite the earlier PNG.
if CommandLine.arguments.contains("--long-image") {
// High-resolution continuous image, preserving every PDF page in reading order.
let longWidth=2560, pagePixelHeight=2000
let longHeight=pagePixelHeight*doc.pageCount
let rgb=CGColorSpace(name:CGColorSpace.sRGB)!
let bitmap=CGContext(data:nil,width:longWidth,height:longHeight,bitsPerComponent:8,bytesPerRow:longWidth*4,space:rgb,bitmapInfo:CGImageAlphaInfo.premultipliedLast.rawValue)!
bitmap.setFillColor(NSColor.white.cgColor);bitmap.fill(CGRect(x:0,y:0,width:longWidth,height:longHeight))
let cgDoc=CGPDFDocument(URL(fileURLWithPath:out) as CFURL)!
for i in 0..<cgDoc.numberOfPages {
 bitmap.saveGState()
 bitmap.translateBy(x:0,y:CGFloat((cgDoc.numberOfPages-1-i)*pagePixelHeight))
 bitmap.scaleBy(x:2,y:2)
 bitmap.clip(to:CGRect(x:0,y:0,width:W,height:H))
 bitmap.drawPDFPage(cgDoc.page(at:i+1)!)
 bitmap.restoreGState()
}
let longImage=bitmap.makeImage()!
let imagePath=root+"output/pdf/温萌_UI作品精选_高清长图.png"
let destination=CGImageDestinationCreateWithURL(URL(fileURLWithPath:imagePath) as CFURL,UTType.png.identifier as CFString,1,nil)!
CGImageDestinationAddImage(destination,longImage,[kCGImagePropertyDPIWidth:144,kCGImagePropertyDPIHeight:144] as CFDictionary)
precondition(CGImageDestinationFinalize(destination),"PNG export failed")
let preview=NSImage(cgImage:longImage,size:NSSize(width:longWidth,height:longHeight))
let small=NSBitmapImageRep(bitmapDataPlanes:nil,pixelsWide:640,pixelsHigh:4500,bitsPerSample:8,samplesPerPixel:4,hasAlpha:true,isPlanar:false,colorSpaceName:.deviceRGB,bytesPerRow:0,bitsPerPixel:0)!
NSGraphicsContext.saveGraphicsState();NSGraphicsContext.current=NSGraphicsContext(bitmapImageRep:small)
preview.draw(in:CGRect(x:0,y:0,width:640,height:4500))
NSGraphicsContext.restoreGraphicsState()
try small.representation(using:.png,properties:[:])!.write(to:URL(fileURLWithPath:"/tmp/portfolio-long-preview.png"))
print("Long image: \(longWidth) x \(longHeight), \(imagePath)")

}
