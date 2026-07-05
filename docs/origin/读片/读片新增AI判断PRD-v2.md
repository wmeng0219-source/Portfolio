# 读片新增AI判断PRD-修改版

# 用户故事

**故事1：**

作为医生，我希望【AI模型能帮我自动识别异常影像】，以便【减少手动读片的时间】，体现在【提高读片效率】；

**故事2：**

作为AI算法开发者、产品经理，我希望【收集医生标记的数据和AI判断的数据的差异】，以便【用于训练新的AI模型或优化原有模型】，体现在【医生和AI识别异常标记不同的数量】；

# 需求变更记录

| **变更人** | **变更时间** | **变更需求** | **变更原因** |
| --- | --- | --- | --- |
| 温萌 | 241101 | AI加载超时去掉【重试】按钮 |  |
|  |  | 【1.5逻辑四】病历同步：同一个牙位的不同描述合并为一条记录展示在病历 |  |
|  |  | 修改原库的弹窗选项细化：全景片、根尖片、咬翼片；选择后读片时，右上角默认选中类型<br>![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/J9LnWNRbZJbMlvDe/img/1b0aea0a-8638-49fd-8096-270b6d5ccdcd.png) |  |
|  |  | 病历同步内容描述修改<br>1.如果是选择了斜杠“/”选择方位格式为：【{片子类型}示：{方位}{文字描述}】；<br>2.如果是选择了斜杠“/”没有选择方位格式为：【{片子类型}示：{文字描述}】；<br>3.如果是选择高低密度，选择方位格式为：【{片子类型}示：{方位}见{高低密度}影，{文字描述}】；<br>2.如果是选择了高低密度,没有选择方位格式为：【{片子类型}示：见{高低密度}影，{文字描述}】； |  |
|  |  | 标记框变更为点击标记框内任何区域都可选中<br>选中卡片时，标记框的层级提高到最高层级，避免大框套小框选不中小框的问题。 |  |
|  |  | 方位变更为单选 |  |
|  |  | 诊断详情填写卡片新增“复用模块”<br>点击复用模块的选项，同步填写对应的“高低密度或/ ”、“诊断”“文字描述”信息。<br>**选项名称：**【牙位】【方位】 无方位时则不展示<br>**逻辑一：**当描述内容（下图）都为空时，在其他标记的填写卡片内的复用模块展示已经完整填写内容的【牙位】【方位】<br>![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/J9LnWNRbZJbMlvDe/img/24f6b417-5ec4-44a2-a802-26b79f14044c.png)<br>**逻辑二：**复用外只展示最新一条标注的牙位（方位），若无，则不显示复用模块，点击"..."图标弹出更多历史标记的牙位（方位），单选。<br>![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/J9LnWNRbZJbMlvDe/img/d30ffa03-d0e4-46e7-9c0b-910dbb8ad158.png)<br>**逻辑三：**当密度、诊断、描述所见任意一项不为空时，则不展示复用模块。 | 为解决不同牙位方位，的异常描述相同时，需要重复录入相同内容的问题 |
| 温萌 | 241101 | 读片类型确认前置（右上角原有位置分类删除）<br>**逻辑一：**点击读片需先确认读片类型，不选择无法进入读片页面（点击弹窗区域外不可关闭弹窗），选择类型后再展示AI读片的数据。<br>**逻辑二：**选择类型后才可点击【确认】按钮，进入读片页面，选择【小牙片】或【咬翼片】展示Ai数据，选择【全景片】时不展示Ai数据<br>**逻辑三：**点击【取消】关闭读片页面，若选择分类内容不保存。<br>**逻辑四：**已选择类型的影像再次进入时不需弹出该弹窗<br>![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/J9LnWNRbZJbMlvDe/img/e8d82086-8f14-40be-aa56-78920d4108bd.png)![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/J9LnWNRbZJbMlvDe/img/8e78b571-4af3-49d0-92c7-d3d7152bdd02.png) | 为了避免左侧分类表全景片小牙片种类分错，导致AI读片不准确。否则AI会把分到小牙片类别里的全景片读出数据。（目前AI仅读小牙片数据） |
| 温萌 | 241106 | 读片页面“确认”按钮名称变更为“完成读片”；将“无法读片”按钮从未标注弹窗里移出到“完成读片”左侧<br>![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/J9LnWNRbZJbMlvDe/img/232acdc1-fffd-4119-a9bb-3fb97c352693.png) ![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/J9LnWNRbZJbMlvDe/img/f223768d-f65c-4c3f-ad42-0cdd0306b5df.png) | 1、“确认”含义模糊，医生不一定会点确认按钮，同时也就找不到“未见明显异常”“无法读片”等按钮<br>2、“无法读片”和“完成读片”为同一层级操作，故从弹窗移出 |
| 温萌 | 241107 | [请至钉钉文档查看附件《诊断和词条》。](https://alidocs.dingtalk.com/i/nodes/93NwLYZXWygYbXAjf5KaLqKlJkyEqBQm?iframeQuery=anchorId%3DX02m36s7sobhzu594mz57r)<br>1、选择“/ ”添加对应诊断，选择“其他”需发送通知（同高低密度其他）<br>2、删除划线部分诊断<br>3、词条需根据选择的诊断展示对应词条，若未选择诊断或选择其他，词条不展示<br>4、诊断需按照“诊断和词条”表格序号升序展示 |  |
| 温萌 | 241107 | 词条样式交互修改，从输入框下方变更为弹窗面板展示<br>**交互：**点击描述所见输入框时，下方弹窗展示词条选项面板，点击词条面板的“x”或点击非所见输入框和词条选项面板的区域时，词条不显示。<br>![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/J9LnWNRbZJbMlvDe/img/51113720-6b2c-4713-9ab5-59e13c2d2592.png) | 词条内容较多，在输入框下方展示卡片会被撑太长，一屏可能展示不全，操作不友好，故变更。 |
| 温萌 | 241113 | 补充【读片逻辑】<br>**逻辑一：**点击【无法读片】前，若影像有AI读片数据或手动标记，则需清空所有标记（AI结果按照“判断错误”处理），即再次读片该张影像时，图片无任何标记内容，允许再次手动标记或再次点击【无法读片】，若再次读片且无任何操作退出读片页面，则保留上次无法读片的结果。<br>**逻辑二：**当点击【无法读片】时，若影像有任何标记，则需二次确认提示“无法读片会清空影像标记，确认是否继续？” |  |
| 温萌 | 241113 | **标记框和卡片交互补充**<br>选中标记框时，右侧卡片展开诊断详情内容，其他框及卡片弱化处理。 |  |
| 温萌 | 241113 | **AI标记框增加点击操作交互：**<br>点击可选中AI标记框，标记框不可拖动和调整大小，同时弱化其他的标记框和卡片。 | 标记框无法实现hover态，故AI标记框更改为可点击态（禁用拖动和调整大小功能）。 |
| 温萌 | 241121 | 【牙菌斑】生成的图不能进行读片。<br>当读片按钮高亮选中时：<br>选择【牙菌斑】生成的图片时，读片按钮取消高亮选中并禁用。<br>读片按钮未选中时：<br>选择【牙菌斑】生成的图片时，读片按钮禁用。 | 牙菌斑生成的图仅用来查看牙菌斑情况。 |

# 需求描述

## 全局说明

### 完整度

![image](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/a/Ry9D2weDXCyazAO0/fc2d603441f542d594e8929e4fb2181d1331.png)

### AI读片类型

根尖片、咬翼片

### 读片顺序

不对AI读片的判断和手动读片的先后顺序做限制，即不需先判读AI的结果才能手动读片。

点击同步的时候调用AI接口，若失败，则在读片时再次调用ai

### AI读片接口调用次数

仅调用一次AI读片，若已调用过AI接口，再次进入后无需再次调用

### 病历内容同步

1.如果是选择了斜杠“/”选择方位格式为：【{片子类型}示：{方位}{文字描述}】；

2.如果是选择了斜杠“/”没有选择方位格式为：【{片子类型}示：{文字描述}】；

3.如果是选择高低密度，选择方位格式为：【{片子类型}示：{方位}见{高低密度}影，{文字描述}】；

2.如果是选择了高低密度，没有选择方位格式为：【{片子类型}示：见{高低密度}影，{文字描述}】；

~~**逻辑一：**~~~~当不同牙位同步到病历的内容一致时，合并为一条记录，十字牙位展示相同病历内容的所有牙位~~

**逻辑二：**选择“/ ”时，的词条单独出

**逻辑三：**同一个牙位的描述合并在一条：【{片子类型}示：{方位1}见{高低密度}影，{描述1}；{方位2}见{高低密度}影，{描述2}】

### 未标注提示弹窗

当影像无任何标记时，点击【完成读片】展示未标注弹窗。

按钮文字修改【未见异常】修改为【未见明显异常】

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/J9LnWNRbZJbMlvDe/img/10c632f5-6974-497b-b589-14567eb0328c.png "未标注弹窗")

~~点击【无法读片】关闭读片页面，同步病历内容：~~~~_{ 影像类型 }影像成像异常不能判读_~~

点击【未见异常】关闭读片页面，根据影像类型同步以下病历内容：

_全景片牙齿数目未见异常，牙胚数目及萌出方向未见异常，根尖周未见明显异常影像，颌骨未见异常影像，关节基本对称。_

_根尖片冠部、牙根、根周膜、根分叉、根尖周未见异常”将同步到病历。_

咬翼片成像各牙位冠部及邻面未见异常低密度影。

点击【继续读片】则关闭弹窗，停留在读片页面

### 【暂不读片】、【无法读片】、【完成读片】按钮

**【完成读片】**

点击【完成读片】校验当前读片的影像必填项，未填则不允许关闭（notification右上角提示“读片数据填写不完整”，必填项下方红色文字提示）如下图；

**【暂不读片】**

若想临时退出读片页面则点击【暂不读片】保留已标注数据，退出读片。

**【无法读片】**

点击【无法读片】关闭读片页面，同步病历内容：_{ 影像类型 }影像成像异常不能判读_

**逻辑一：**点击【无法读片】前，若影像有AI读片数据或手动标记，则需清空所有标记（AI结果按照“判断错误”处理），即再次读片该张影像时，图片无任何标记内容，允许再次手动标记或再次点击【无法读片】，若再次读片且无任何操作退出读片页面，则保留上次无法读片的结果。

**逻辑二：**当点击【无法读片】时，若影像有任何标记，则需二次确认提示“无法读片会清空影像标记，确认是否继续？”

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/J9LnWNRbZJbMlvDe/img/c1884e55-5122-44bf-85dc-ba488dc73748.png)

### 卡片和框的交互

**交互一：**当鼠标悬浮在框或者卡片时，其他框和卡片都降低不透明度。删除卡片时需要二次确认。如下图：

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/J9LnWNRbZJbMlvDe/img/42ea9b88-a16e-4333-bdfa-b07c03162bee.png "填写诊断详情") ![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/J9LnWNRbZJbMlvDe/img/ddaf1593-f4d5-473a-8947-58e7a57d0086.png "悬浮在判读卡片") ![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/J9LnWNRbZJbMlvDe/img/bca66226-ad66-4d33-9c4f-ee35af575874.png "操作小卡片时")

**交互二：**选中标记框时，右侧卡片展开诊断详情内容，其他框及卡片弱化处理。

### 标记框操作逻辑

由原来的点击边框选中，变更为点击标记框内任何区域都可选中

选中卡片时，标记框的层级提高到最高层级，避免大框套小框选不中小框的问题。

### 分类错误弹窗的类型修改

弹窗选项细化：全景片、根尖片、咬翼片；选择后进入读片时，右上角默认选中对应的类型

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/J9LnWNRbZJbMlvDe/img/1b0aea0a-8638-49fd-8096-270b6d5ccdcd.png)

## AI读片

### AI读片加载

首次进入读片，出现“AI读片中...”的加载页面；若AI读片超过5s则显示【手动读片】按钮；若加载超时（根据系统处理时间）显示“AI读片超时”和【手动读片】、~~【重试】按钮~~

点击【手动读片】，进入读片页面，用户手动框选读片（点击【手动读片】后，不再展示AI的读片数据）

点击【重试】，则继续调用AI接口，若AI读片成功则进入读片页面，否则继续展示超时页面。

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/J9LnWNRbZJbMlvDe/img/599ea1c2-ecc6-4af9-b269-1a63c429bf17.png "AI读片中")   ![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/J9LnWNRbZJbMlvDe/img/8765787c-354b-44a4-bff1-6b4e6e1cb105.png "AI读片超过5s")   ![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/J9LnWNRbZJbMlvDe/img/909ae20c-dc9b-439e-acf7-a50109991e4f.png "读片超时")

### AI判读页面

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/J9LnWNRbZJbMlvDe/img/ecea834c-9e92-44af-ae21-029551ad94f3.png)

#### 影像类型提示

**展示逻辑：**右上角「影像类型」未选择时，该处不展示，选中「影像类型时」则展示对应提示文字

**展示文字：**

全景片：_\*请注意检查牙齿数目、牙胚数目、萌出方向、根尖周未、颌骨、关节，若未见异常，则“全景片牙齿数目未见异常，牙胚数目及萌出方向未见异常，根尖周未见明显异常影像，颌骨未见异常影像，关节基本对称”将同步到病历。_

根尖片：_\*请注意检查冠部、牙根、根周膜、根分叉、根尖周， 若未见异常，则“根尖片冠部、牙根、根周膜、根分叉、根尖周未见异常”将同步到病历。_

咬翼片：\*请注意检查成像各牙位冠部及邻面，若未见异常，则“咬翼片成像各牙位冠部及邻面未见异常低密度影”将同步到病历。

**极值情况：**文字超过可展示宽度时换行处理。

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/J9LnWNRbZJbMlvDe/img/b20623a3-2ade-4d16-99d5-91a3875577b5.png "文字换行")

#### 影像类型确认

**选项内容：**全景片、根尖片、咬翼片（单选不可反选）

**逻辑一：**若已知影像类型，则默认选中对应类型；若影像类型未知，则不选中选项；

**逻辑二：**选项选中后可修改，修改的类型不同步到原图库，仅对病历同步生效

#### AI判断卡片

**卡片内容：**标题（高/低密度异常影）、眼睛icon、【判断正确、继续读片】、【判断正确、无需写入病历】、【判断错误】

**逻辑：**AI标记框在选中【判断正确、继续读片】之前不可删除

**交互一：**点击【判断正确、无需写入病历】、【判断错误】删除AI对应的标记框和判读卡片；

**交互二：**鼠标悬浮在「判断卡片」上时，被悬浮的卡片底色变白色

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/J9LnWNRbZJbMlvDe/img/2aae02a4-491d-4f26-adba-2fc56fc2e18d.png "悬浮在卡片") ![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/AJdl64pg6ZNQqke1/img/1f85a59c-e539-469b-aeb1-c0a7e5bc6bd8.png "卡片悬浮颜色变化")

**交互三：**点击眼睛可隐藏对应的标记框，松手展示对应的标记框。并展示对应的tooltip，如下图：

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/J9LnWNRbZJbMlvDe/img/5d2aff78-12fc-4406-beaf-546d311168d1.png "点击隐藏") ![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/J9LnWNRbZJbMlvDe/img/07390875-9c2b-4871-a56a-3cadefa7eb26.png "松手展示")

#### AI声明

**显示内容：**_注意：AI影像分析结果仅供参考，医生对影像诊断结果负责。_

**显示逻辑：**常态显示在页面底部

### AI读片详情填写

AI判断页面点击【判断正确、继续读片】，AI框变橘色框（可编辑），判读卡片—>详情填写卡片。

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/J9LnWNRbZJbMlvDe/img/49cd745c-7104-4f3c-92b7-55dc464265f9.png "读片详情填写")

除高低密度外，增加选项“/”，选中后“/ ”后需添加对应诊断（见“诊断和词条”表格）；

**新增词条**

**词条诊断对应：**[请至钉钉文档查看附件《诊断和词条》。](https://alidocs.dingtalk.com/i/nodes/93NwLYZXWygYbXAjf5KaLqKlJkyEqBQm?iframeQuery=anchorId%3DX02m2yl28dao96vbsaavq)（划线部分需删除）

**词条逻辑一：**词条需根据选择的诊断展示对应词条，若未选择诊断或选择其他，词条不展示

**词条逻辑二：**诊断展示顺序调整，诊断需按照“诊断和词条”表序号升序展示

**词条交互：**点击描述所见输入框时，下方弹窗展示词条选项面板，点击词条面板的“x”或点击非所见输入框和词条选项面板区域时，词条不显示。

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/J9LnWNRbZJbMlvDe/img/0a5aac41-923d-44b5-9ef5-3ac0f8395d5c.png "词条交互")

**新增“复用模块”**

点击复用模块的选项，同步填写对应【牙位（&方位）】的“高低密度或/ ”、“诊断”、“文字描述”。

逻辑：外面只展示最新一条标注的牙位（方位），若无，则不显示复用模块；点击"..."图标弹出更多历史标记的牙位（方位），单选；

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/J9LnWNRbZJbMlvDe/img/7b625128-804c-43bd-8881-97f810f530f6.png)

**逻辑一：**AI框不允许删除和编辑，点击【判断正确，继续读片】后点击详情填写卡片右上的删除icon可删除对应的标记框和填写卡片

**逻辑二：**点击选中橙色标记框时，可编辑框的大小和位置，~~同时按下键盘的backspace或delete键可删除标记框和对应的填写卡片。~~

**逻辑三：**若未点击【保存】按钮，直接对其他框或卡片进行操作，则当前详情填写卡片缩小。

**交互一：**点击【保存】按钮后，填写中的大卡片根据内容必填项填写情况（除方位外其他为必填项）变为不同类型的小卡片；标记框退出编辑状态。再次点击小卡片可恢复到大卡片和标记框的编辑状态。

填写完成（必填项填写完整）小卡片展示文字“_{牙位}{方位}见{高低密度}{诊断}影像，{所见描述}_ ”文字超过展示“...”

部分填写（必填项未填写完整）或未填写完成（必填项未填写）小卡片展示红色文字“_未填写完整_ ” 或“_未填写_ ”，卡片左上角红色点提示。

如下图：

  ![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/J9LnWNRbZJbMlvDe/img/00740fd1-49d2-4998-b2b3-3df5628d5a45.png "点击保存后页面")   ![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/J9LnWNRbZJbMlvDe/img/e86f187f-7d60-435c-ba5f-3da4309771bc.png)

**交互二：**鼠标在小卡片非icon区域悬浮时，展示hover状态（tooltip+底色加深），如下图：

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/J9LnWNRbZJbMlvDe/img/6ff7c7e5-b7ad-4fbc-83fd-2ac45e77d834.png)

**交互三：**点击填写卡片的删除icon时，弹出二次确认弹窗“确认删除该读片标记”，点击【确认】删除标记框和填写卡片；点击【取消】则确认弹窗消失

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/J9LnWNRbZJbMlvDe/img/97bcbc4e-ca97-48ac-8f54-080f7c532800.png)

### 手动读片

手动拖动框结束后，标记框为可编辑状态，对应的卡片为大卡片填写状态，填写和保存逻辑同 2.3AI读片填写

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/J9LnWNRbZJbMlvDe/img/383e8669-a617-43ed-b8b6-06da19e7ff7a.png "手动读片")