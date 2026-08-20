from django.contrib import admin
from .models import (
    SiteSettings, HeroSection, SpecialtiesSection, SpecialtyItem,
     StatsSection, StatItem, ManifestoSection, FeaturedWorkSection, FeaturedShoot,
    TestimonialsSection, Testimonial, InstagramSection, InstagramImage,
    CTASection, Enquiry, FAQSection, FAQItem,
    StudioSection, ProcessSection, ProcessStep, FooterSection
)

class SingletonAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        return not self.model.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(SiteSettings)
class SiteSettingsAdmin(SingletonAdmin):
    pass


@admin.register(HeroSection)
class HeroSectionAdmin(SingletonAdmin):
    pass


@admin.register(SpecialtiesSection)
class SpecialtiesSectionAdmin(SingletonAdmin):
    pass


@admin.register(SpecialtyItem)
class SpecialtyItemAdmin(admin.ModelAdmin):
    list_display = ['label', 'description', 'order']
    list_editable = ['order']
    ordering = ['order']


@admin.register(StatsSection)
class StatsSectionAdmin(SingletonAdmin):
    pass


@admin.register(StatItem)
class StatItemAdmin(admin.ModelAdmin):
    list_display = ['label', 'value', 'suffix', 'order']
    list_editable = ['value', 'suffix', 'order']
    ordering = ['order']


@admin.register(ManifestoSection)
class ManifestoSectionAdmin(SingletonAdmin):
    pass

@admin.register(FeaturedWorkSection)
class FeaturedWorkSectionAdmin(SingletonAdmin):
    pass


@admin.register(FeaturedShoot)
class FeaturedShootAdmin(admin.ModelAdmin):
    list_display = ['title', 'tag', 'order']
    list_editable = ['order']
    ordering = ['order']   
@admin.register(StudioSection)
class StudioSectionAdmin(SingletonAdmin):
    pass


@admin.register(ProcessSection)
class ProcessSectionAdmin(SingletonAdmin):
    pass


@admin.register(ProcessStep)
class ProcessStepAdmin(admin.ModelAdmin):
    list_display = ['title', 'number', 'order']
    list_editable = ['number', 'order']
    ordering = ['order']

@admin.register(TestimonialsSection)
class TestimonialsSectionAdmin(SingletonAdmin):
    pass


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ['name', 'shoot', 'rating', 'order']
    list_editable = ['order']
    ordering = ['order']     


@admin.register(InstagramSection)
class InstagramSectionAdmin(SingletonAdmin):
    pass


@admin.register(InstagramImage)
class InstagramImageAdmin(admin.ModelAdmin):
    list_display = ['alt_text', 'order']
    list_editable = ['order']
    ordering = ['order']

@admin.register(CTASection)
class CTASectionAdmin(SingletonAdmin):
    pass


@admin.register(Enquiry)
class EnquiryAdmin(admin.ModelAdmin):
    list_display = ['email', 'created_at']
    readonly_fields = ['email', 'created_at']
    ordering = ['-created_at']

    def has_add_permission(self, request):
        return False  # these only come in through the website form    

@admin.register(FAQSection)
class FAQSectionAdmin(SingletonAdmin):
    pass


@admin.register(FAQItem)
class FAQItemAdmin(admin.ModelAdmin):
    list_display = ['question', 'order']
    list_editable = ['order']
    ordering = ['order']    

@admin.register(FooterSection)
class FooterSectionAdmin(SingletonAdmin):
    pass    