import mysql.connector



conn = mysql.connector.connect(
    host = "localhost",
    user = "wirapat",
    password = "d997692a4fbc",
    database = "meeting_room_report"
)


for row in [
                "มีการทักทายทกคนเพื่อสร้างบรรยากาศที่ดี",
                "ทุกคนได้รับการปฏิบัติด้วยความเคารพ",
                "มีการแสดงความสนใจอย่างเท่าเทียมกันต่อทุกไอเดีย",
                "ผู้คนได้รับการรับฟังอย่างตั้งใจ",
                "การสนทนาใช้ภาษาที่ฉันเข้าใจได้",
                "มีการยืนยันว่าทุกคนเข้าใจวัตถุประสงค์และผลการประชุม",
                "มีการแชร์วาระและเอกสารหรือการสื่อสารก่อนการประชุม",
                "มีการแสดงความเห็น ถามคำถามที่เปิดกว้างและตรงไปตรงมา?",
                "มีการตัดสินใจร่วมกันโดยคำนึงถึงความคิดเห็นและข้อกังวลของทุกคน?",
                "ทุกคนในการประชุมแสดงความกระตือรือร้น?"
            ]:
    
    cursor = conn.cursor()

    cursor.execute("INSERT INTO meeting_questions (question_text) VALUES (%s)", (row, ))

    cursor.close()



for row in [
  {
    "id": 1,
    "meetingName": 'Meeting A',
    "room_id": 1,
    "details": 'Discussion on Project X',
    "participants": 15
  },
  {
    "id": 2,
    "meetingName": 'Meeting B',
    "room_id": 2,
    "details": 'Team Building Session',
    "participants": 10
  },
  {
    "id": 3,
    "meetingName": 'Meeting C',
    "room_id": 3,
    "details": 'Monthly Review Meeting',
    "participants": 20
  },
  {
    "id": 4,
    "meetingName": 'Meeting D',
    "room_id": 4,
    "details": 'Training Workshop',
    "participants": 25
  },
  {
    "id": 5,
    "meetingName": 'Meeting E',
    "room_id": 5,
    "details": 'Project Kickoff',
    "participants": 12
  },
  {
    "id": 6,
    "meetingName": 'Meeting F',
    "room_id": 6,
    "details": 'Brainstorming Session',
    "participants": 18
  },
  {
    "id": 7,
    "meetingName": 'Meeting G',
    "room_id": 7,
    "details": 'Client Presentation',
    "participants": 30
  },
  {
    "id": 8,
    "meetingName": 'Meeting H',
    "room_id": 8,
    "details": 'Team Retrospective',
    "participants": 14
  },
  {
    "id": 9,
    "meetingName": 'Meeting I',
    "room_id": 9,
    "details": 'Product Launch Planning',
    "participants": 22
  },
  {
    "id": 10,
    "meetingName": 'Meeting J',
    "room_id": 10,
    "details": 'QA and Testing Discussion',
    "participants": 16
  }
]:
    cursor = conn.cursor()

    cursor.execute("INSERT INTO meeting_topics (name, room_id, details, people_count) VALUES (%s, %s, %s, %s)", [row['meetingName'], row['room_id'], row['details'], row['participants'], ])

    cursor.close()


for row in [
    "publish",
    "vote-closed", # can add ...
]:
    cursor = conn.cursor()

    cursor.execute("INSERT INTO meeting_topic_statuses (name) VALUES (%s)", [row, ])

    cursor.close()


for row in [
  {
    "room": 'Not specified',
  },
  {
    "room": 'Room 102',
  },
  {
    "room": 'Room 103',
  },
  {
    "room": 'Room 104',
  },
  {
    "room": 'Room 105',
  },
  {
    "room": 'Room 106',
  },
  {
    "room": 'Room 107',
  },
  {
    "room": 'Room 108',
  },
  {
    "room": 'Room 109',
  },
  {
    "room": 'Room 110',
  }
]:
    cursor = conn.cursor()

    cursor.execute("INSERT INTO meeting_rooms (name) VALUES (%s)", [row['room'], ])

    cursor.close()


for row in [
    {
      "code": "2399016",
      "role": "admin"
    }
]:
    cursor = conn.cursor()

    cursor.execute("INSERT INTO user_roles(code, role) VALUES (%s, %s)", [row['code'], row['role'], ])

    cursor.close()
    
    


conn.commit()
conn.close()