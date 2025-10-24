import { AppDispatch, RootState } from "@/store";
import {
  addProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
} from "@/store/slices/productSlice";
import { Product } from "@/types/product";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Form,
  Image,
  Input,
  InputNumber,
  List,
  message,
  Modal,
  Popconfirm,
  Space,
  Typography,
  Upload,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const { Title } = Typography;

const Store: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading } = useSelector(
    (state: RootState) => state.products
  );
  const [form] = Form.useForm();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [fileList, setFileList] = useState<any[]>([]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const openAddModal = () => {
    setEditing(null);
    setFileList([]);
    form.resetFields();
    setModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditing(product);
    form.setFieldsValue({
      ...product,
      images: undefined,
    });
    setFileList(
      product.images.map((img) => ({
        uid: String(img.id),
        name: img.fileName,
        status: "done",
        url: img.url,
      }))
    );
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    dispatch(deleteProduct(id))
      .unwrap()
      .then(() => message.success("Xoá sản phẩm thành công"))
      .catch(() => message.error("Xoá thất bại"));
  };

  const handleFinish = async (values: any) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("price", values.price);
    fileList.forEach((file: any) => {
      if (file.originFileObj) {
        formData.append("files", file.originFileObj);
      }
    });
    try {
      if (editing) {
        await dispatch(updateProduct({ id: editing.id, formData })).unwrap();
        message.success("Cập nhật sản phẩm thành công");
      } else {
        await dispatch(addProduct(formData)).unwrap();
        dispatch(fetchProducts());
        message.success("Thêm sản phẩm thành công");
      }
      setModalOpen(false);
      form.resetFields();
      setFileList([]);
    } catch {
      message.error("Có lỗi xảy ra");
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <Title level={2}>Cửa hàng của tôi</Title>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={openAddModal}
        style={{ marginBottom: 16 }}
      >
        Thêm sản phẩm
      </Button>
      <List
        grid={{ gutter: 16, column: 2 }}
        loading={loading}
        dataSource={products}
        renderItem={(item) => (
          <List.Item>
            <Card
              title={item.title}
              actions={[
                <EditOutlined key="edit" onClick={() => openEditModal(item)} />,
                <Popconfirm
                  title="Xoá sản phẩm này?"
                  onConfirm={() => handleDelete(item.id)}
                >
                  <DeleteOutlined key="delete" />
                </Popconfirm>,
              ]}
            >
              <div style={{ marginBottom: 8 }}>
                <b>Giá:</b> {item.price.toLocaleString()} đ
              </div>
              <div style={{ marginBottom: 8 }}>
                <b>Mô tả:</b> {item.description}
              </div>
              <div>
                <b>Ảnh:</b>
                <Space wrap>
                  {item.images.map((img) => (
                    <Image
                      key={img.id}
                      width={60}
                      src={`${window._env_.VITE_MINIO_URL}${img.url}`}
                      alt={img.fileName}
                    />
                  ))}
                </Space>
              </div>
            </Card>
          </List.Item>
        )}
      />

      <Modal
        title={editing ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          initialValues={{ price: 0 }}
        >
          <Form.Item
            name="title"
            label="Tên sản phẩm"
            rules={[{ required: true, message: "Bắt buộc" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true, message: "Bắt buộc" }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item
            name="price"
            label="Giá"
            rules={[{ required: true, message: "Bắt buộc" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="Ảnh sản phẩm">
            <Upload
              fileList={fileList}
              onChange={({ fileList: newList }) => setFileList(newList)}
              beforeUpload={() => false}
              listType="picture-card" // 👈 phải là union cụ thể, không phải string
              multiple
              maxCount={5}
            >
              <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              {editing ? "Cập nhật" : "Thêm mới"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Store;
