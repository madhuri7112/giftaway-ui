import smtplib
msg = 'Hello world.'

server = smtplib.SMTP('smtp.gmail.com',587) #port 465 or 587
server.ehlo()
server.starttls()
server.ehlo()
server.login('giftaway.wpl@gmail.com','giftaway123')
server.sendmail('giftaway.wpl3@gmail.com','madhuri.palagummi3@gmail.com',msg)
server.close()
