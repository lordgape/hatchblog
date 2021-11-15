from locust import HttpUser, task, between
class HatchBlogTask(HttpUser):
  wait_time = between(1, 5)

  def on_start(self):
      self.client.get("/")
 
  @task()
  def posts(self):
      self.client.get("/api/posts?tags=tech")
 
