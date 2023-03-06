import React from "react";
import { Select, message, Form, Input, Button } from "antd";
import "./index.css";

const App = () => {
    const baseUrl = "https://frozen-dawn-71816.herokuapp.com";

    const updateCountdown = async (value) => {
        await fetch(`${baseUrl}/countdown/update`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                coutdown: value,
            }),
        })
            .then(() => {
                message.success("Successfully changed countdown");
            })
            .catch(() => {
                message.error("Failed to update countdown");
            });
    };

    const addUpdate = async ({ update, color }) => {
        await fetch(`${baseUrl}/updates`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                update,
                color,
            }),
        })
            .then(
                (resp) =>
                    resp.status === 200 &&
                    message.success("Successfully added update")
            )
            .catch(() => message.error("Failed to add update"));
    };

    return (
        <div className="container">
            <Form
                name="updatez"
                onFinish={({ color, update }) => addUpdate({ update, color })}
                autoComplete="off"
            >
                <Form.Item
                    label="Update"
                    name="update"
                    rules={[
                        {
                            required: true,
                            message: "Please input the update!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Color"
                    name="color"
                    rules={[
                        {
                            required: true,
                            message: "Please input the color!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
            <Select
                placeholder="Countdown"
                onChange={(value) => updateCountdown(value)}
                options={[
                    {
                        value: true,
                        label: "Keep counting",
                    },
                    {
                        value: false,
                        label: "Remove countdown",
                    },
                ]}
            />
        </div>
    );
};

export default App;
